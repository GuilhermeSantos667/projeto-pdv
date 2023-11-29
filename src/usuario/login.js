require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../conexao');
const senhaJWT = process.env.SENHA_JWT
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const data = await knex('usuarios').where('email', email);

        if (data.length === 0) {
            return res.status(400).json({ mensagem: "E-mail e/ou senha inválido(s)." });
        }

        const { senha: senhaUsuario, ...usuario } = data[0];

        const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);
        
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'E-mail e/ou senha inválido(s).' });
        };

        const token = jwt.sign({ id: usuario.id }, senhaJWT, { expiresIn: '8h' });
        return res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    login,
}
