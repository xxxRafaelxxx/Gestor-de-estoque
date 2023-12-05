const { estoque, Produto } = require('../bancoDeDados');

const listaProdutos = (req, res) => {
    res.json(estoque);
};

const deletarProdutos = (req, res) => {
    const produtoId = Number(req.params.id);

    const index = estoque.findIndex(produto => produto.id === produtoId);

    if (index !== -1) {
        const produtoRemovido = estoque.splice(index, 1);
        res.json({ message: 'Produto removido com sucesso.', removedProduct: produtoRemovido[0] });
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
};

const cadastrarProdutos = (req, res) => {
    const novoProduto = new Produto(req.body.id = estoque.length + 1, req.body.nome, req.body.quantidade, req.body.preco);
    estoque.push(novoProduto);
    res.status(201).json(novoProduto);

};
const editarProdutos = (req, res) => {
    const produtoId = Number(req.params.id);
    const atualizacaoProduto = req.body;

    const produtoExistente = estoque.find(produto => produto.id === produtoId);

    if (produtoExistente) {

        produtoExistente.nome = atualizacaoProduto.nome || produtoExistente.nome;
        produtoExistente.quantidade = atualizacaoProduto.quantidade || produtoExistente.quantidade;
        produtoExistente.preco = atualizacaoProduto.preco || produtoExistente.preco;


        res.json({ message: 'Produto atualizado com sucesso.' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
};

module.exports = {
    Produto,
    listaProdutos,
    cadastrarProdutos,
    editarProdutos,
    deletarProdutos
};
