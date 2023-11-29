require('dotenv').config();
const jwt = require('jsonwebtoken');
const knex = require('../conexao')

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Usuário não autorizado!' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SENHA_JWT);

        const usuario = await await knex('usuarios').where('id', id).first();

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado!' });
        }

        const { senha: _, ...usuarioAutenticado } = usuario;

        req.usuario = usuarioAutenticado;

        next();
    } catch (error) {
        
        return res.status(401).json({ mensagem: 'Usuário não autorizado!' });
    }
}

module.exports = {
    verificarUsuarioLogado
}