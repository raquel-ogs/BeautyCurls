var fkUsuario = sessionStorage.ID;
var postCurtido = false;

function verificarCurtida(fkPostagem){
    fetch(`/usuarios/verificarCurtida/${fkUsuario}/${fkPostagem}`)
    .then(resposta => {

        if (resposta.ok) {
            mudarIconeLike(resposta.status, fkPostagem)
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        })
        .catch(function (error) {
        console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function mudarIconeLike(statusResposta, fkPostagem){
    var iconLike = document.getElementById(`post${fkPostagem}_like`);

    if(statusResposta == 204){
        postCurtido = true;
        iconLike.classList.value = "fi fi-sr-heart"
    } else {
        postCurtido = false;
        iconLike.classList.value = "fi fi-br-heart"
    }
}

function atualizarQtdLike(fkPostagem){

    var qtdLike = document.getElementById(`qtdLike_post${fkPostagem}`);

    fetch(`/postagem/atualizarCurtida/${fkPostagem}`)
    .then(resposta => {

        if (resposta.ok) {
            resposta.json().then(resposta => {
                qtdLike.innerHTML = resposta[0].qtdCurtida;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        })
        .catch(function (error) {
        console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}

function atualizarCurtida(resposta, fkPostagem){
    mudarIconeLike(resposta.status, fkPostagem);
    atualizarQtdLike(fkPostagem);
}

function curtirOuDescurtir(fkPostagem) {
    verificarCurtida(fkPostagem);

    if(postCurtido){
        fetch(`/usuarios/apagarCurtida/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkUsuarioServer: fkUsuario,
                fkPostagemServer: fkPostagem
            })
              
        })
        .then(resposta => {

            if (resposta.ok) {
                setTimeout(() => {
                    atualizarCurtida(resposta, fkPostagem)
                }, 100);
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
            })
            .catch(function (error) {
            console.error(`Erro ao tentar apagar curtida: ${error.message}`);
            });
    } else {
        fetch(`/usuarios/adicionarCurtida/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkUsuarioServer: fkUsuario,
                fkPostagemServer: fkPostagem
            })
                
        })
        .then(resposta => {
            if (resposta.ok) {
                setTimeout(() =>{
                    atualizarCurtida(resposta, fkPostagem)
                }, 100);
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
            })
            .catch(function (error) {
                console.error(`Erro ao tentar adicionar curtida: ${error.message}`);
        });
        
    }
        
}
