const knex = require('../conexao');
const { excluirArquivoProduto, upload } = require('../storage');

const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;


    const update = {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
    };

    try {
        const verificarCategoria = await knex('categorias').where({ id: categoria_id }).first();

        if (!verificarCategoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada para o ID informado' });
        }

        const verificarProduto = await knex('categorias').where({ id }).first();


        if(!verificarProduto){
            return res.status(404).json({message: "id nao encontrado"})
        }

        if(req.file){

            const {originalname, mimetype, buffer} = req.file;
            
            if(verificarProduto.produto_imagem){

            const imagemDeletada = await excluirArquivoProduto(verificarProduto.produto_imagem) 

            }
            

            const imagemInserida = await upload(originalname, buffer, mimetype)
            
            update.produto_imagem = imagemInserida.url;
            const produto = await knex('produtos')
            .where({id})
            .update(update)
            .returning('*');
      return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso', produto });
          }

        await knex('produtos')
            .where({ id })
            .update(update);

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = editarProduto;
