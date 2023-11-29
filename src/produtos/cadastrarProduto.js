require('dotenv').config()
const knex = require('../conexao');
const multer = require('../multer');
const { upload } = require('../storage');


const cadastrarProduto = async (req, res) => {
  
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
        
     
        try {
            const verificarCategoria = await knex('categorias').where({ id: categoria_id }).first();

            if (!verificarCategoria) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada para o ID informado' });
            }
  
            if(req.file){

              const {originalname, mimetype, buffer} = req.file;

              const imagem = await upload(originalname, buffer, mimetype)
              
              const produto = await knex('produtos')
        .insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: imagem.url })
        .returning('*');
        
        return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso', produto });
            }

            
    
     

      const produto = await knex('produtos')
        .insert({ descricao, quantidade_estoque, valor, categoria_id})
        .returning('*');

      return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso', produto });
    } catch (error) {
      console.log(error)
      return res.status(500).json("Erro do servidor!");
    }
  };


module.exports = {
    cadastrarProduto,
    multer
}
