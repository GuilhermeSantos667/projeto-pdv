const express = require('express')
const { validarReq, schemaUsuario, schemaLogin, schemaCliente } = require('./validacoes/schemas')
const { login } = require('./usuario/login');
const cadastro = require('./usuario/cadastro')
const listarCategoria = require('./categoria/listarCategoria')
const { verificarUsuarioLogado } = require('./validacoes/autenticacao');
const detalharUsuario = require('./usuario/detalharUsuario');
const atualizarUsuario = require('./usuario/atualizarUsuario');
const { detalharProduto } = require('./produtos/detalharProduto');
const deletarProduto = require('./produtos/deletarProduto');

const { cadastrarProduto } = require('./produtos/cadastrarProduto');
const schemaProduto = require('./validacoes/produtoSchema');

const { cadastrarCliente, editarCliente, detalharCliente, listar } = require("./clientes/clientes")



const editarProduto = require('./produtos/editarProduto');
const { listarProdutos } = require('./produtos/listarProdutos');
const multer = require('./multer');

const cadastrarPedidos = require('./pedidos/cadastrarPedidos');
const { listarPedido } = require('./pedidos/listarPedido');

const rotas = express()


rotas.post('/usuario', validarReq(schemaUsuario), cadastro);
rotas.post('/login', validarReq(schemaLogin), login);
rotas.get('/categoria', listarCategoria);

rotas.use(verificarUsuarioLogado);
//usuarios
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarReq(schemaUsuario), atualizarUsuario);

//cliente
rotas.post('/cliente', validarReq(schemaCliente), cadastrarCliente);
rotas.put('/cliente/:id', validarReq(schemaCliente), editarCliente);
rotas.get('/cliente', listar);
rotas.get('/cliente/:id', listar);

//produto
rotas.post('/produto', multer.single('produto_imagem'), validarReq(schemaProduto), cadastrarProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', deletarProduto);

rotas.put('/produto/:id', validarReq(schemaProduto), editarProduto);

//pedidos
rotas.post('/pedido', cadastrarPedidos);
rotas.get('/pedido', listarPedido)


module.exports = rotas