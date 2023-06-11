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


function listarFotoPerfil(req, res) {
    usuarioModel.listarFotoPerfil().then(function (resultado) {
        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.status(200).send("Nenhuma foto encontrada");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar listar fotos de perfil.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function atualizarFotoPerfil(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var fkFotoPerfil = req.body.fkFotoPerfilServer;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (fkFotoPerfil == undefined) {
        res.status(400).send("Seu fkFotoPerfil está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.atualizarFotoPerfil(idUsuario, fkFotoPerfil)
            .then(
                function (resultado) {
                    res.status(200).send('Foto atualizada!')
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar foto de perfil! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function verificarQtdFotoPerfil(req, res) {
    usuarioModel.verificarQtdFotoPerfil().then(function (resultado) {
        if (resultado.length > 0) {
            res.json(resultado[0])
        } else {
            res.status(200).send("Nenhuma foto encontrada");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar listar fotos de perfil.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var user = req.body.userServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var curvatura = req.body.curvaturaServer;
    var fotoPerfil = req.body.fotoPerfilServer;

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
    } else if (fotoPerfil == undefined) {
        res.status(400).send("Sua foto de perfil está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, user, email, senha, curvatura, fotoPerfil)
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

function adicionarVisita(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkPostagem = req.body.fkPostagemServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (fkPostagem == undefined) {
        res.status(400).send("Seu fkPostagem está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.adicionarVisita(fkUsuario, fkPostagem)
            .then(
                function (resultado) {
                    res.status(204).send("Postagem foi visitada!");
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao adicionar visita! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarPostsCurtidos(req, res) {
    var fkUsuario = req.params.fkUsuario;

    usuarioModel.listarPostsCurtidos(fkUsuario).then(function (resultado) {
        res.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar listar posts curtidos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarCurtida(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var fkPostagem = req.params.fkPostagem;

    console.log(`Verificando se existe curtida na postagem de id: ${fkPostagem}`);

    usuarioModel.verificarCurtida(fkUsuario, fkPostagem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(204).send("Existe")
        } else {
            res.status(200).send("Não existe");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar verificar curtida.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function adicionarCurtida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkPostagem = req.body.fkPostagemServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (fkPostagem == undefined) {
        res.status(400).send("Seu fkPostagem está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.adicionarCurtida(fkUsuario, fkPostagem)
            .then(
                function (resultado) {
                    res.status(204).send("Postagem está curtida!")
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao curtir a postagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function apagarCurtida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkPostagem = req.body.fkPostagemServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (fkPostagem == undefined) {
        res.status(400).send("Seu fkPostagem está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.apagarCurtida(fkUsuario, fkPostagem)
            .then(
                function (resultado) {
                    res.status(200).send('Postagem não está mais curtida!')
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao descurtir a postagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificarSalvo(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var fkPostagem = req.params.fkPostagem;

    console.log(`Verificando se existe salvo na postagem de id: ${fkPostagem}`);

    usuarioModel.verificarSalvo(fkUsuario, fkPostagem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(204).send("Existe")
        } else {
            res.status(200).send("Não existe");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar verificar salvo.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPostsSalvos(req, res) {
    var fkUsuario = req.params.fkUsuario;

    usuarioModel.listarPostsSalvos(fkUsuario).then(function (resultado) {
            res.json(resultado)
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar listar posts salvos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function adicionarSalvo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkPostagem = req.body.fkPostagemServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (fkPostagem == undefined) {
        res.status(400).send("Seu fkPostagem está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.adicionarSalvo(fkUsuario, fkPostagem)
            .then(
                function (resultado) {
                    res.status(204).send("Postagem está salva!");
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao salvar a postagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function apagarSalvo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkPostagem = req.body.fkPostagemServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (fkPostagem == undefined) {
        res.status(400).send("Seu fkPostagem está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.apagarSalvo(fkUsuario, fkPostagem)
            .then(
                function (resultado) {
                    res.status(200).send("Postagem não está mais salva")
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao apagar salvo na postagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificarQtdCurtida(req, res) {
    var fkUsuario = req.params.fkUsuario;

    console.log(`Verificando quantidade de salvos do usuário de id: ${fkUsuario}`);

    usuarioModel.verificarQtdCurtida(fkUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar verificar salvo.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarQtdSalvo(req, res) {
    var fkUsuario = req.params.fkUsuario;

    console.log(`Verificando quantidade de salvos do usuário de id: ${fkUsuario}`);

    usuarioModel.verificarQtdSalvo(fkUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao tentar verificar salvo.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    testar,
    entrar,
    listarFotoPerfil,
    atualizarFotoPerfil,
    verificarQtdFotoPerfil,
    cadastrar,
    verificarUser,
    verificarEmail,
    adicionarVisita,
    listarPostsCurtidos,
    verificarCurtida,
    adicionarCurtida,
    apagarCurtida,
    listarPostsSalvos,
    verificarSalvo,
    adicionarSalvo,
    apagarSalvo,
    verificarQtdCurtida,
    verificarQtdSalvo
}