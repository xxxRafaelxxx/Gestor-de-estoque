const estoque = [{
    id: 1,
    nome: "blusa",
    quantidade: 1,
    preco: 10.00
}];



class Produto {
    constructor(id, nome, quantidade, preco) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }
};

module.exports = { estoque, Produto };