var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var user = req.body.userServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var curvatura = req.body.curvaturaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (user == undefined) {
        res.status(400).send("Seu user está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (curvatura == undefined) {
        res.status(400).send("Sua curvatura está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, user, email, senha, curvatura)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificarUser(req, res) {
    var nomeUser = req.params.nomeUser;

    console.log(`Verificando nome do usuário`);

    usuarioModel.verificarUser(nomeUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(204).send("")
        } else {
            res.status(200).send("Nenhum nome de usuário encontrado");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar verificar nome de usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarEmail(req, res) {
    var emailUser = req.params.emailUser;

    console.log(`Verificando nome do usuário`);

    usuarioModel.verificarEmail(emailUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(204).send("Esse email já foi cadastrado")
        } else {
            res.status(200).send("Nenhum email encontrado");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar verificar nome de usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    entrar,
    cadastrar,
    testar,
    verificarUser,
    verificarEmail
}