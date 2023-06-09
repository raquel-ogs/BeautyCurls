// sessão
function exibirDadosConta() {
    // aguardar();
    var idUsuario = sessionStorage.ID;
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
    var qtdCurtidosUsuario = document.getElementById("qtdCurtidos")
    var qtdSalvosUsuario = document.getElementById("qtdSalvos")

    nomeCompleto.innerHTML = `${nome} ${sobrenome}`;
    userUsuario.innerHTML = user;
    emailUsuario.innerHTML = email;
    curvaturaUsuario.innerHTML = curvatura;
    fotoConta.src = urlFotoPerfil;

    for (var contadorLetra = 0; contadorLetra < senha.length; contadorLetra++) {
        senhaUsuario.innerHTML += '*';
    }

    fetch(`../usuarios/verificarQtdCurtida/${idUsuario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {
                    qtdCurtidosUsuario.innerHTML = `${resposta[0].qtdCurtida} curtidos`;
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

    fetch(`../usuarios/verificarQtdSalvo/${idUsuario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {
                    qtdSalvosUsuario.innerHTML = `${resposta[0].qtdSalvo} salvos`;
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}