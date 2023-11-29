const knex = require('../conexao')
const listarPedido = async (req, res) =>{

    const {cliente_id} = req.query

    if(cliente_id){
        const query = await knex("pedidos").where({cliente_id})

        return res.status(200).json(query)
    } 
    
    const queryPedidos = await knex("pedidos")
    const queryPedido_produtos = await knex("pedido_produtos")

    const queryFormatada = {
        pedido: queryPedidos,
        pedido_produtos: queryPedido_produtos
    }

    return res.status(200).json(queryFormatada)

}

module.exports = {listarPedido}