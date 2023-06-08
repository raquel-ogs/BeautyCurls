// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL;
    var nome = sessionStorage.NOME;
    var user = sessionStorage.USER;
    var urlFotoPerfil = sessionStorage.FOTO_PERFIL;

    var nomeUser = document.getElementById("nomeUser");
    var fotoPerfil = document.getElementById("fotoPerfil");

    if (email != undefined && nome != undefined) {
        nomeUser.innerHTML = user;
        fotoPerfil.src = urlFotoPerfil;

    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    // var divAguardar = document.getElementById("div_aguardar");
    // divAguardar.style.display = "flex";
    console.log('aguardando...')
}

function finalizarAguardar(texto) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: texto,
        confirmButtonColor: "#FF5E81",
        iconColor: '#FF5E81',
    })      
}

