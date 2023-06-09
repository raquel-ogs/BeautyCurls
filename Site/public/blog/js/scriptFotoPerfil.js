var idUsuario = sessionStorage.ID;

function listarFotos() {
    fetch(`../usuarios/listarFotoPerfil/`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(resposta => {
                    resposta.forEach(foto => {
                        photos.innerHTML += `
                            <div class="card-photo">
                                <img src="${foto.url}" onclick="atualizarFotoPerfil(${foto.idFotoPerfil}, '${foto.url}')">
                                <h3 class="photo-title"> ${foto.titulo} </h3>
                            </div>
                        `;
                    });
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}

function atualizarFotoPerfil(idFotoPerfil, urlImg) {
    fetch(`/usuarios/atualizarFotoPerfil/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            fkFotoPerfilServer: idFotoPerfil
        })
    })
        .then(resposta => {
            console.log(resposta.ok)

            if (resposta.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Foto de perfil atualizada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                })

                setTimeout(() => {
                    window.location = './conta.html'
                }, 1700);

                sessionStorage.FOTO_PERFIL = urlImg;

            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na atualização da foto de perfil: ${error.message}`);
        });

}