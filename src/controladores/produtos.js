class Produto {
    constructor(id, nome, quantidade) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
    }
}

const listarProduto = (req, res) => {
    res.json(estoque);
};

const cadastrarProdutos = (req, res) => {
    const novoProduto = new Produto(req.body.id, req.body.nome, req.body.quantidade);
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

        res.json({ message: 'Produto atualizado com sucesso.' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
};

const deletarProdutos = (req, res) => {
    const produtoId = Number(req.params.id);

    const index = estoque.findIndex(produto => produto.id === produtoId);

    if (index !== -1) {
        estoque.splice(index, 1);
        res.json({ message: 'Produto removido com sucesso.' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
};

module.exports = {
    Produto,
    listarProduto,
    cadastrarProdutos,
    deletarProdutos,
    editarProdutos
};
