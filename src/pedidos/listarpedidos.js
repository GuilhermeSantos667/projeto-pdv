const knex = require('../conexao')
const listarPedidos = async (req, res) => {
    const cliente_id = req.query;
    try {
        if (cliente_id) {
            const verificarCliente = await knex('clientes').where({ id: cliente_id }).first();
            if (!verificarCliente) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado para o ID informado ' })
            }
            const pedidosPorCliente = await knex('pedidos').where({ cliente_id })
            const pedidosPorClienteMaisProdutos = [];
            for (let pedido of pedidosPorCliente) {
                const produtosPorPedido = await knex('pedidos_produtos').where({ pedido_id: pedido.id });
                pedidosPorClienteMaisProdutos.push(pedido.concat(produtosPorPedido));
            }
            return res.json(pedidosPorClienteMaisProdutos);
        }
        const pedidos = await knex('pedidos');
        const pedidosMaisProdutos = [];
        for (let pedido of pedidos) {
            const produtosPorPedido = await knex('pedidos_produtos').where({ pedido_id: pedido.id });
            pedidosMaisProdutos.push(pedido.concat(produtosPorPedido));
        }
        return res.json(pedidosMaisProdutos);
    } catch (error) {
        return res.status(401).json({ mensagem: 'Erro interno do servidor' });
    };
}
module.exports = {
    listarPedidos
}