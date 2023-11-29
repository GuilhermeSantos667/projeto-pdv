require('dotenv').config()
const express = require('express');
const rotas = require('./rotas');
const app = express();
const multer = require('multer');



app.use(express.json());
app.use(rotas);


if (process.env.PORT !== 'test') {
  app.listen(3000, () => {
    console.log("Servidor rodando");
  });
}

module.exports = app;
