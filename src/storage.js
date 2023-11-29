require('dotenv').config()
const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.KEY_APP   
  }
  
});

const listagemArquivos = async () => {

  const arquivos = await s3.listObjects({
      Bucket: process.env.KEY_NAME
  }).promise()

  return arquivos;

}

const upload = async (path, buffer, mimetype) => {
 
 const imagem = await s3.upload({
    Bucket: process.env.KEY_NAME,
    Key: path,
    Body: buffer,
    ContentType: mimetype,
  }).promise()

  return {
        path: imagem.Key,
        url: `https://${process.env.KEY_NAME}.${process.env.ENDPOINT}/${imagem.Key}`

    }
}

const excluirArquivoProduto = async (path) => {

  await s3.deleteObject({
      Bucket: process.env.KEY_NAME,
      Key: path
  }).promise();


}




module.exports = {

  listagemArquivos,
  excluirArquivoProduto,
  upload

}

