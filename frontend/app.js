document.addEventListener('DOMContentLoaded', function () {
    mostrarAba('busca');

    const formCadastro = document.getElementById('form-cadastro');
    formCadastro.addEventListener('submit', cadastrarProduto);
});
const redirecionarParaLogin = () => {

    const novaPagina = './login/index.html';
    window.location.href = novaPagina;
}
function mostrarAba(aba) {
    const abas = document.querySelectorAll('.aba');
    abas.forEach((element) => {
        element.style.display = 'none';
    });

    const abaSelecionada = document.getElementById(`aba-${aba}`);
    if (abaSelecionada) {
        abaSelecionada.style.display = 'block';

        if (aba === 'busca') {
            carregarProdutos();
        }
    }
}

function carregarProdutos() {
    const listaProdutos = document.getElementById('lista-produtos-busca');
    const mensagemListagem = document.getElementById('mensagem-listagem');

    listaProdutos.innerHTML = '';

    fetch('http://localhost:3000/produtos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de resposta do servidor: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(produtos => {
            produtos.forEach(produto => {
                const li = document.createElement('li');
                li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Preço: uni R$ ${produto.preco.toFixed(2)} - total R$ ${produto.preco.toFixed(2) * produto.quantidade}`;
                listaProdutos.appendChild(li);
            });

            mensagemListagem.style.display = produtos.length > 0 ? 'block' : 'none';
        })
        .catch(error => console.error(`Erro ao obter a lista de produtos: ${error.message}`));
}

function buscarProduto() {
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();
    const listaProdutos = document.getElementById('lista-produtos-busca');

    listaProdutos.innerHTML = '';

    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(produtos => {
            const produtosFiltrados = produtos.filter(produto =>
                produto.nome.toLowerCase().includes(termoBusca)
            );

            produtosFiltrados.forEach(produto => {
                const li = document.createElement('li');
                li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Preço: uni R$ ${produto.preco.toFixed(2)}  `;

                const botaoApagar = document.createElement('button');
                botaoApagar.textContent = 'Apagar';
                botaoApagar.addEventListener('click', () => apagarProduto(produto.id));
                li.appendChild(botaoApagar);

                const botaoEditar = document.createElement('button');
                botaoEditar.textContent = 'Editar';
                botaoEditar.addEventListener('click', () => editarProduto(produto.id));
                li.appendChild(botaoEditar);

                listaProdutos.appendChild(li);
            });

            const mensagemListagem = document.getElementById('mensagem-listagem');
            mensagemListagem.style.display = produtosFiltrados.length > 0 ? 'block' : 'none';
        })
        .catch(error => console.error('Erro ao obter a lista de produtos:', error));
}

function apagarProduto(id) {
    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Produto apagado com sucesso.');
                carregarProdutos();
            } else {
                console.error('Erro ao apagar o produto.');
            }
        })
        .catch(error => console.error('Erro ao apagar o produto:', error));
}
function editarProduto(id) {

    const novoNome = prompt('Digite o novo nome do produto:');
    const novaQuantidade = prompt('Digite a nova quantidade do produto:');
    const novoPreco = prompt('Digite o novo preco do produto:');


    if (novoNome === null || novaQuantidade === null || novoPreco === null) {
        return;
    }


    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: novoNome, quantidade: parseFloat(novaQuantidade), preco: parseFloat(novoPreco) })
    })
        .then(response => {
            if (response.ok) {
                console.log('Produto editado com sucesso.');
                carregarProdutos();
            } else {
                console.error('Erro ao editar o produto.');
            }
        })
        .catch(error => console.error('Erro ao editar o produto:', error));
}



function cadastrarProduto(event) {
    event.preventDefault();


    const nomeProduto = document.getElementById('nome-produto').value;
    const quantidadeProduto = document.getElementById('quantidade-produto').value;
    const precoProduto = document.getElementById('preco-produto').value;


    if (!nomeProduto || !quantidadeProduto || !precoProduto) {
        alert('Por favor, preencha todos os campos.');
        return;
    }


    const novoProduto = {
        nome: nomeProduto,
        quantidade: parseInt(quantidadeProduto, 10),
        preco: parseFloat(precoProduto)
    };


    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
    })
        .then(response => response.json())
        .then(produtoCadastrado => {
            console.log('Produto cadastrado com sucesso:', produtoCadastrado);

            carregarProdutos();
        })
        .catch(error => console.error('Erro ao cadastrar o produto:', error));
}
