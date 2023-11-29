const knex = require('../conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {

  const id = req.usuario.id;
  const { nome, email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const update = {
    nome,
    email,
    senha: senhaCriptografada
  }

  try {
    await knex('usuarios')
      .where({ id })
      .update(update);

    res.status(200).json({ menssagem: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário. Verifique os dados e tente novamente' });
  }

}

module.exports = atualizarUsuario;