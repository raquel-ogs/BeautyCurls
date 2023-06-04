// sessão
function exibirNomeUsuario() {
    // aguardar();

    var nome = sessionStorage.NOME;

    var nomeUsuario = document.getElementById("nomeUsuario");

    nomeUsuario.innerHTML = nome;
}
