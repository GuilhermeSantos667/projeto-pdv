const knex = require('../conexao')

const listarCategoria = async (rec, res) => {

    try {

        const categoria = await knex('categorias')
        return res.json(categoria)



    } catch (error) {
        return res.status(500).json("erro do servidor!")
    }
}


module.exports = listarCategoria