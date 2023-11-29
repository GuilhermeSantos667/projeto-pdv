const knex = require('../conexao')
const bcrypt = require('bcrypt')

const cadastro = async(req, res) =>{
    const {nome, email, senha} = req.body

    try {
        
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = {
            nome,
            email,
            senha: senhaCriptografada

        }

        const existeUsuario = await knex("usuarios").where({email})

        if(existeUsuario.length > 0){

            return res.status(400).json({message: "ja existe um usuario com esse email"})
        }
        const novoUsuario = await knex("usuarios").insert(usuario);
        return res.status(201).json({message: "usuario criado!"});
    } catch (error) {
        console.log(error)
        return res.status(500).json("erro do servidor!")
    }


}

module.exports = cadastro