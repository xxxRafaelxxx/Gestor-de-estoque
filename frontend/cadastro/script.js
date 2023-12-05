
function validarCadastro() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const repetirSenha = document.getElementById("repetirSenha").value;
    const cpf = document.getElementById("cpf").value;


    if (nome.trim() === "" || email.trim() === "" || senha.trim() === "" || repetirSenha.trim() === "" || cpf.trim() === "") {
        alert("Por favor, preencha todos os campo.");
        return;
    } else if (senha !== repetirSenha) {
        alert("As senhas não coincidem. Por favor, digite a mesma senha nos dois campos.");
        return;
    }
    function validarSenha(senha) {

        if (/\s/.test(senha)) {
            return false;
        } else if (/(\w)\1{2,}/.test(senha)) {
            return false;
        } else if (senha.length > 16 || senha.length < 8) {
            alert("A senha deve ter entre 8 a 16 caracters ")
            return;
        } else if (String(senha).includes(" ")) {
            alert("A senha não pode conter espaços em branco")
            return;
        }

        redirecionarParaTelaDeLogin();

    }
    validarSenha(senha);
};


const pegarCpf = document.getElementById("cpf");


pegarCpf.addEventListener("input", function () {

    let valorCpf = pegarCpf.value.replace(/\D/g, '');
    pegarCpf.value = pegarCpf.value = valorCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

});


function redirecionarParaTelaDeLogin() {
    const telaDeLogin = '../login/index.html';
    window.location.href = telaDeLogin;
}

