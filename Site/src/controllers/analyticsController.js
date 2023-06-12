var analyticsModel = require("../models/analyticsModel");

function testar(req, res) {
    console.log("ENTRAMOS NA analyticsController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listarQtdVisitas(req, res) {
    var fkUsuario = req.params.fkUsuario;

    analyticsModel.listarQtdVisitas(fkUsuario)
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

function listarQtdCurtidas(req, res) {
    var fkUsuario = req.params.fkUsuario;

    analyticsModel.listarQtdCurtidas(fkUsuario)
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

function listarQtdSalvos(req, res) {
    var fkUsuario = req.params.fkUsuario;

    analyticsModel.listarQtdSalvos(fkUsuario)
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

function listarQtdPosts(req, res) {
    analyticsModel.listarQtdPosts()
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

function buscarCurtidaHoje(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var hora = req.params.hora;

    analyticsModel.buscarCurtidaHoje(fkUsuario, hora)
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

function buscarCurtidaMes(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var mes = req.params.mes;

    analyticsModel.buscarCurtidaMes(fkUsuario, mes)
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

function buscarSalvoHoje(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var hora = req.params.hora;

    analyticsModel.buscarSalvoHoje(fkUsuario, hora)
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

function buscarSalvoMes(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var mes = req.params.mes;

    analyticsModel.buscarSalvoMes(fkUsuario, mes)
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


module.exports = {
    listarQtdVisitas,
    listarQtdCurtidas,
    listarQtdSalvos,
    listarQtdPosts,
    buscarCurtidaHoje,
    buscarCurtidaMes,
    buscarSalvoHoje,
    buscarSalvoMes,
    testar
}