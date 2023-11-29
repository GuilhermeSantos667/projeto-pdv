const knex = require('../conexao');

const cadastrarCliente = async (req, res) => {
  try {
    const {  nome, email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;

    const clienteExistente = await knex('clientes').where('email', email).first();

    if (clienteExistente) {
      return res.status(400).json({ mensagem: 'Cliente já cadastrado com esse email.' });
    }

    const novoCliente = await knex('clientes').insert({
  nome,
  email,
  cpf,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  estado    
    });


    return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

  const editarCliente = async (req, res) => {

    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;
    const update = {
        nome, email, cpf, cep, rua, numero, bairro, cidade, estado
    }


    try {

        const verificarEmail = await knex("clientes").where({ email }).andWhere("id", "!=", id).first();
        if (verificarEmail) {
            return res.status(400).json({ mensagem: 'Email já cadastrado!' });
        }

        const verificarCpf = await knex("clientes").where({ cpf }).andWhere("id", "!=", id).first();
        if (verificarCpf) {
            return res.status(400).json({ mensagem: 'Cpf já cadastrado!' });
        }

        const verificarCliente = await knex("clientes").where({ id }).first();
        if (!verificarCliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        }

        await knex('clientes')
            .where({ id })
            .update(update);

        return res.status(200).json();

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o usuário. Verifique os dados e tente novamente' });
    }



}
const detalharCliente = async (req, res) => {
    try {
      const { id } = req.params;
  
      const cliente = await knex('clientes').where('id', id).first();
  
      if (!cliente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }
  
      return res.json(cliente);
    } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  };
const listar = async (req, res) => {
    try {
      const query = await knex("clientes").select('*');
  
      return res.json(query);
  
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  module.exports = {
    cadastrarCliente, 
    detalharCliente,
    editarCliente,
    listar

  }