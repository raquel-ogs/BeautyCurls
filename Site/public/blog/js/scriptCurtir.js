var fkUsuario = sessionStorage.ID;
var statusResposta = 0;
var postCurtido = false;
var postSalvo = false;

function verificarCurtida(fkPostagem){
    fetch(`/usuarios/verificarCurtida/${fkUsuario}/${fkPostagem}`)
    .then(resposta => {

        if (resposta.ok) {
            statusResposta = resposta.status;
            mudarIcone(fkPostagem)
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        })
        .catch(function (error) {
        console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function mudarIcone(fkPostagem){
    if(statusResposta == 204){
        postCurtido = true;
        var iconLike = document.getElementById(`post${fkPostagem}_like`);
        iconLike.classList.value = "fi fi-sr-heart"
    } else {
        postCurtido = false;
    }
}

function curtirOuDescurtir(fkPostagem) {
    verificarCurtida(fkPostagem);

    if(postCurtido){

    }
        
}
