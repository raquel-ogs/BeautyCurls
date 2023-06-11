var analyticsModel = require("../models/analyticsModel");

var sessoes = [];

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

function buscarInteracaoHoje(req, res) {
    var fkUsuario = req.params.fkUsuario;

    analyticsModel.buscarInteracaoHoje(fkUsuario)
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

function buscarInteracaoAno(req, res) {
    var fkUsuario = req.params.fkUsuario;
    var mes = req.params.mes;

    analyticsModel.buscarInteracaoAno(fkUsuario, mes)
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
    buscarInteracaoHoje,
    buscarInteracaoAno,
    testar
}