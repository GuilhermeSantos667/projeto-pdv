const knex = require('../conexao');
const transportador = require('../emails/transportador');
const compiladorHtml = require('../utils/compiladorHtml');


const cadastrarPedidos = async (req, res) => {

    const { cliente_id, pedido_produtos } = req.body;

    try {

        const verificarCliente = await knex("clientes").where({ id: cliente_id }).first();
        if (!verificarCliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        }

        const produtosValidos = await Promise.all(pedido_produtos.map(async (item) => {
            const { produto_id, quantidade_produto } = item;
            const produto = await knex('produtos').where({ id: produto_id }).first();

            if (!produto) {
                return res.status(400).json({ error: `Produto ${produto_id} não encontrado.` });
            }

            if (produto.estoque < quantidade_produto) {
                return res.status(400).json({ error: `Estoque insuficiente para o produto ${produto_id}.` });
            }

            return {
                produto_id: produto.id,
                quantidade_produto,
                preco_unitario: produto.valor,
            };
        }));

        if (produtosValidos.length !== pedido_produtos.length) {
            return;
        }

        const valorTotal = produtosValidos.reduce((total, item) => total + item.quantidade_produto * item.preco_unitario, 0);

        const pedido = { cliente_id, valor_total: valorTotal };
        const pedidoCadastro = await knex('pedidos').insert(pedido).returning("*");
        const { id } = pedidoCadastro[0];


        const pedidoProdutosParaInserir = produtosValidos.map(item => ({
            pedido_id: id,
            produto_id: item.produto_id,
            quantidade_produto: item.quantidade_produto,
            valor_produto: item.preco_unitario,
        }));


        await knex('pedido_produtos').insert(pedidoProdutosParaInserir);

        const contexto = { nome: verificarCliente.nome, pedido_id: id };
        const html = await compiladorHtml("./src/templates/pedido.html", contexto);
        await transportador.sendMail({
            from: "Douglas <douglas@hotmail.com>",
            to: `${verificarCliente.nome} <${verificarCliente.email}>`,
            subject: "Pedido realizado com sucesso",
            html
        })
        res.status(201).json({ message: 'Pedido criado com sucesso.' });
    } catch (error) {

        return res.status(500).json("erro do servidor! " + error.message);
    }

}

module.exports = cadastrarPedidos;


