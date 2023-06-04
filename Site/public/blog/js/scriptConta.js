// sessão
function exibirDadosConta() {
    // aguardar();

    var email = sessionStorage.EMAIL;
    var nome = sessionStorage.NOME;
    var sobrenome = sessionStorage.SOBRENOME;
    var curvatura = sessionStorage.CURVATURA;
    var senha = sessionStorage.SENHA;
    var user = sessionStorage.USER;
    var urlFotoPerfil = sessionStorage.FOTO_PERFIL;

    var nomeCompleto = document.getElementById("nomeCompleto");
    var fotoConta = document.getElementById("fotoConta");
    var userUsuario = document.getElementById("userUsuario");
    var emailUsuario = document.getElementById("email");
    var senhaUsuario = document.getElementById("senha");
    var curvaturaUsuario = document.getElementById("curvatura");

    nomeCompleto.innerHTML = `${nome} ${sobrenome}`;
    userUsuario.innerHTML = user;
    emailUsuario.innerHTML = email;
    curvaturaUsuario.innerHTML = curvatura;
    fotoConta.src = urlFotoPerfil;

    for(var contadorLetra = 0; contadorLetra < senha.length; contadorLetra++){
        senhaUsuario.innerHTML += '*';
    }
}