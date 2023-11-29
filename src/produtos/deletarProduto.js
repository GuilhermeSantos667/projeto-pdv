const knex = require('../conexao');
const { excluirArquivoProduto } = require('../storage');

const deletarProduto = async (req, res) => {

  const idProduto = req.params.id;

  try {
    
   const produto = await knex('produtos').select('*').where('id', idProduto).first();
   
   if(!produto){
    return res.status(401).json({erro: 'O produto não existe'});
   }

  const verificarPedido = await knex('pedido_produtos').select('produto_id').where('produto_id', idProduto);

  if(verificarPedido.length > 0 ){
    return res.status(401).json({erro: 'Existem pedidos associados a esse produto'});
  }

  const urlProduto = produto.produto_imagem;

  await excluirArquivoProduto(urlProduto);

  await knex('produtos').where('id', idProduto).del();

  return res.status(204).json();    

}catch(error){
  
  return res.status(500).json({error: "Erro interno do servidor"});

}

}

module.exports = deletarProduto;