const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3000;
const estoque = require('./bancoDeDados')
const { listarProduto, deletarProdutos, cadastrarProdutos, editarProdutos } = require('./controladores/produtos')

app.use(express.json());

app.use(cors());


app.get('/produtos', listarProduto);

app.post('/produtos', cadastrarProdutos);

app.put('/produtos/:id', editarProdutos);

app.delete('/produtos/:id', deletarProdutos);


app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});