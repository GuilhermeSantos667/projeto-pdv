const knex = require('../conexao')

const detalharUsuario = async (req, res) => {
    try {
        const usuario = await knex('usuarios').where('id', req.usuario.id).select('id', 'nome', 'email').first();
        return res.json(usuario)
    } catch (error) {
        
        return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado.' });
    }
}

module.exports = detalharUsuario;