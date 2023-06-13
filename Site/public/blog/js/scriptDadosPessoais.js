var idUsuario = sessionStorage.ID;

function buscarCurvaturas() {
    fetch('../curvatura/listar')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (resposta) {
            resposta.forEach(element => {
                select_curvatura.innerHTML += `<option value="${element.idCurvatura}" id="option_${element.idCurvatura}">${element.nome}</option>`
            });
        });
}

function exibirDados() {
    buscarCurvaturas();

    var urlFotoPerfil = sessionStorage.FOTO_PERFIL;
    var nome = sessionStorage.NOME;
    var sobrenome = sessionStorage.SOBRENOME;
    var user = sessionStorage.USER;
    var email = sessionStorage.EMAIL;
    var senha = sessionStorage.SENHA;
    var fkCurvatura = Number(sessionStorage.FK_CURVATURA);

    var fotoConta = document.getElementById("fotoConta");
    var inputNome = document.getElementById("input_nome");
    var inputSobrenome = document.getElementById("input_sobrenome");
    var inputUser = document.getElementById("input_nomeUser");
    var inputEmail = document.getElementById("input_email");
    var inputSenha = document.getElementById("input_senha");
    var selectCurvatura = document.getElementById("select_curvatura");

    inputNome.value = nome;
    inputSobrenome.value = sobrenome;
    inputUser.value = user;
    inputEmail.value = email;
    inputSenha.value = senha;   
    fotoConta.src = urlFotoPerfil;

    setTimeout(() => {selectCurvatura.value = fkCurvatura;}, 100)
    
}

function verificarUser(user) {
    if(user != sessionStorage.USER){
        fetch(`../usuarios/verificarUser/${user}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.status;
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
    } else {
        return 200;
    }
        
}

function verificarEmail(email) {
    if (email.indexOf('@') == -1) {
        return 203;
    } else if(email != sessionStorage.EMAIL){
        fetch(`../usuarios/verificarEmail/${email}`)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.status;
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na verifição do nome de usuário: ${error.message}`);
            });
    } else {
        return 200;
    }
}


function atualizarDados() {
    var nomeVar = input_nome.value;
    var sobrenomeVar = input_sobrenome.value;
    var userVar = input_nomeUser.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var curvaturaVar = select_curvatura.value;
    var statusRespostaUser = verificarUser(userVar);
    var statusRespostaEmail = verificarEmail(emailVar);

    if (emailVar == "" || senhaVar == "" || curvaturaVar == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha todos os campos!',
            confirmButtonColor: "#FF5E81",
            iconColor: '#FF5E81',
        })

        return false;

    } else {
            if (statusRespostaEmail == 200 && statusRespostaUser == 200) {
                fetch(`../usuarios/atualizarDadosPessoais/${idUsuario}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeServer: nomeVar,
                        sobrenomeServer: sobrenomeVar,
                        userServer: userVar,
                        emailServer: emailVar,
                        senhaServer: senhaVar,
                        curvaturaServer: Number(curvaturaVar),
                    })
                }).then(function (resposta) {

                    console.log("resposta: ", resposta);

                    if (resposta.ok) {

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Dados pessoais atualizados com sucesso',
                            showConfirmButton: false,
                            timer: 1500
                        })
        
                        setTimeout(() => {
                            window.location = './conta.html'
                        }, 1700);


                        sessionStorage.NOME = nomeVar;
                        sessionStorage.SOBRENOME = sobrenomeVar;
                        sessionStorage.USER = userVar;
                        sessionStorage.EMAIL = emailVar;
                        sessionStorage.SENHA = senhaVar;
                        sessionStorage.CURVATURA = document.getElementById(`option_${curvaturaVar}`).innerText;    
                        sessionStorage.FK_CURVATURA = curvaturaVar;    

                    } else {
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                    finalizarAguardar(resposta);
                });

                return false;
            }
            else if (statusRespostaEmail == 203) {
                finalizarAguardar('Email inválido, tente novamente')
            } else if(statusRespostaUser == 204) {
                finalizarAguardar('Esse nome de usuário já foi cadastrado, tente com outro')
            } else {
                finalizarAguardar('Esse email já foi cadastrado, tente com outro')
            }
    }
}

