const knex = require('../conexao');

const detalharProduto = async (req, res) => {

  const idProduto = req.params.id;

  try {
    
    const produto = await knex('produtos')
    .innerJoin('categorias', 'categorias.id', 'produtos.categoria_id')
    .select('produtos.id', 'produtos.descricao', 
    'produtos.quantidade_estoque',
    'produtos.valor',
    'categorias.descricao as nome_da_categoria')
    .where('produtos.id', idProduto);

    if(produto.length === 0){
      return res.status(400).json({erro: 'Produto não encontrado'});
    }
    
    return res.json(produto);

  }catch(error){
    return res.status(500).json({error: "Erro interno do servidor"});
  }

}

module.exports = {detalharProduto};