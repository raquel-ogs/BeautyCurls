var idPost = sessionStorage.ID_POST;

fetch(`/postagem/listarPostagem/${idPost}`)
    .then(resposta => {
        if (resposta.ok) {
            console.log(resposta);
            
            resposta.json().then(postagem => {
                if(postagem[0].categoria == 'Penteado'){
                    listarPenteado(postagem[0]);
                } else {
                    listarReceita(postagem[0]);
                }
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro ao tentar listar penteados recentes: ${error.message}`);
    });

function listarReceita(receita){
    posts.innerHTML += `                    
        <div class="post-information">
            <div class="image-recipe">
                <div class="img-post">
                    <div class="background-post"></div>
                    <img src="${receita.urlImagem}">
                </div>
                <div class="icons">
                        <div class="card-icon">
                            <i class="fi fi-br-heart" onclick="curtirOuDescurtir(${receita.idPostagem})" id="post${receita.idPostagem}_like"></i>
                            <h3 id="qtdLike_post${receita.idPostagem}"> ${receita.qtdCurtida} </h3>
                        </div>
                        <div class="card-icon">
                            <i class="fi fi-br-bookmark" onclick="salvarOuDessalvar(${receita.idPostagem})" id="post${receita.idPostagem}_salvo"></i>
                            <h3 id="qtdSalvo_post${receita.idPostagem}"> ${receita.qtdSalvo} </h3>
                        </div>
                    </div>
            </div>
            <div class="post-texts">
                <h2> ${receita.titulo} </h2>
                <h4> ${receita.descricao} </h4>
            </div>
        </div>
        <div class="post-ingredients">
            <h2> Ingredientes Necessários </h2>
            <ul class="list-ingredients" id="listaIngredientes"></ul>
        </div>
        <div class="post-steps">
            <h2> Passo a Passo </h2>
            <ol class="list-steps" id="listaPassos">
            </ol>
        </div>
    `;

    verificarCurtida(receita.idPostagem);
    verificarSalvo(receita.idPostagem);
    listarIngredientes(receita.idPostagem)
    listarPassos(receita.idPostagem)
}

function listarPenteado(penteado){
    posts.innerHTML += `                    
        <div class="post-information">
            <div class="image-hairstyle">
                <div class="img-post">
                    <div class="background-post"></div>
                    <img src="${penteado.urlImagem}">
                </div>
                <div class="icons">
                        <div class="card-icon">
                            <i class="fi fi-br-heart" onclick="curtirOuDescurtir(${penteado.idPostagem})" id="post${penteado.idPostagem}_like"></i>
                            <h3 id="qtdLike_post${penteado.idPostagem}"> ${penteado.qtdCurtida} </h3>
                        </div>
                        <div class="card-icon">
                            <i class="fi fi-br-bookmark" onclick="salvarOuDessalvar(${penteado.idPostagem})" id="post${penteado.idPostagem}_salvo"></i>
                            <h3 id="qtdSalvo_post${penteado.idPostagem}"> ${penteado.qtdSalvo} </h3>
                        </div>
                    </div>
            </div>
            <div class="post-texts">
                <h2> ${penteado.titulo} </h2>
                <h4> ${penteado.descricao} </h4>
            </div>
        </div>
        <div class="post-steps">
            <h2> Passo a Passo </h2>
            <ol class="list-steps" id="listaPassos">
            </ol>
        </div>
        <div class="post-inspiration">
            <h2> Inspiração <h4>
            <h4> 
                <a href="${penteado.urlInspiracao}"> ${penteado.urlInspiracao} </a>
            </h4>
        </div>
    `;

    verificarCurtida(penteado.idPostagem);
    verificarSalvo(penteado.idPostagem);
    listarPassos(penteado.idPostagem)
}

function listarIngredientes(idPost){
    fetch(`/postagem/listarIngredientes/${idPost}`)
    .then(resposta => {
        if (resposta.ok) {
            console.log(resposta);
            
            resposta.json().then(ingredientes => {
                for(var contadorIngrediente = 0; contadorIngrediente < ingredientes.length; contadorIngrediente++){
                    var ingredienteAtual = ingredientes[contadorIngrediente];

                    listaIngredientes.innerHTML += `
                        <li class="list-item">
                            <h4> ${ingredienteAtual.descricao} </h4>
                        </li>
                    `;
                }
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro ao tentar listar ingredientes: ${error.message}`);
    });

}

function listarPassos(idPost){
    fetch(`/postagem/listarPassos/${idPost}`)
    .then(resposta => {
        if (resposta.ok) {
            console.log(resposta);
            
            resposta.json().then(passos => {
                for(var contadorPasso = 0; contadorPasso < passos.length; contadorPasso++){
                    var passoAtual = passos[contadorPasso];

                    listaPassos.innerHTML += `
                        <li class="list-item">
                            <h4> ${passoAtual.descricao} </h4>
                        </li>
                    `;
                }
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro ao tentar listar ingredientes: ${error.message}`);
    });

}