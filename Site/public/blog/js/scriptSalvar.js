var fkUsuario = sessionStorage.ID;
var postSalvo = false;

function verificarSalvo(fkPostagem){
    fetch(`/usuarios/verificarSalvo/${fkUsuario}/${fkPostagem}`)
    .then(resposta => {

        if (resposta.ok) {
            mudarIconeSalvo(resposta.status, fkPostagem)
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        })
        .catch(function (error) {
        console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function mudarIconeSalvo(statusResposta, fkPostagem){
    var iconSalvo = document.getElementById(`post${fkPostagem}_salvo`);

    if(statusResposta == 204){
        postSalvo = true;
        iconSalvo.classList.value = "fi fi-sr-bookmark"
    } else {
        postSalvo = false;
        iconSalvo.classList.value = "fi fi-br-bookmark"
    }
}

function atualizarQtdSalvo(fkPostagem){

    var qtdSalvo = document.getElementById(`qtdSalvo_post${fkPostagem}`);

   
    fetch(`/postagem/atualizarSalvo/${fkPostagem}`)
    .then(resposta => {

        if (resposta.ok) {
            resposta.json().then(resposta => {
                qtdSalvo.innerHTML = resposta[0].qtdSalvo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
        })
        .catch(function (error) {
        console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}

function atualizarSalvo(resposta, fkPostagem){
    mudarIconeSalvo(resposta.status, fkPostagem);
    atualizarQtdSalvo(fkPostagem);
}

function salvarOuDessalvar(fkPostagem) {
    verificarSalvo(fkPostagem);

    if(postSalvo){
        fetch(`/usuarios/apagarSalvo/`, {
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
                    atualizarSalvo(resposta, fkPostagem)
                }, 100);
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
            })
            .catch(function (error) {
            console.error(`Erro ao tentar apagar Salvo: ${error.message}`);
            });
    } else {
        fetch(`/usuarios/adicionarSalvo/`, {
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
                    atualizarSalvo(resposta, fkPostagem)
                }, 100);
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
            })
            .catch(function (error) {
                console.error(`Erro ao tentar adicionar salvo: ${error.message}`);
        });
        
    }
        
}
