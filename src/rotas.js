const express = require('express');
const rotas = express();
const { listaProdutos, deletarProdutos, cadastrarProdutos, editarProdutos } = require('./controladores/produtos');
rotas.use(express.json());

rotas.get('/', (req, res) => {
    res.send("Servidor funcionado")
});

rotas.get('/produtos', listaProdutos);

rotas.post('/produtos', cadastrarProdutos);

rotas.put('/produtos/:id', editarProdutos);

rotas.delete('/produtos/:id', deletarProdutos);

module.exports = rotas;


