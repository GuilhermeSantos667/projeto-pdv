const knex = require('../conexao')

const listarClientes = async (rec, res) => {

    try {

        const cliente = await knex('clientes')
        console.log(cliente)
        return res.json(cliente)



    } catch (error) {
        return res.status(500).json("erro do servidor!")
    }
}


module.exports = listarClientes