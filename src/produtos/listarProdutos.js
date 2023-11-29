const knex = require('../conexao')
const listarProdutos = async (req, res) => {
    const categoria_id = req.query.filtro;
    try {
        if (categoria_id) {
            const verificarCategoria = await knex('categorias').where({ id: categoria_id }).first();

            if (!verificarCategoria) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada para o ID informado ' })
            }

            const produtosPorCategoria = await knex('produtos').where({ categoria_id })
            return res.json(produtosPorCategoria);
        }
        const produtos = await knex('produtos')
        return res.json(produtos)
    } catch (error) {
        return res.status(401).json({ mensagem: 'Erro interno do servidor' });
    };
}
module.exports = {
    listarProdutos
}