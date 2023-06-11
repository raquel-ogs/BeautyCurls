var express = require("express");
var router = express.Router();

var analyticsController = require("../controllers/analyticsController");

router.get("/", function (req, res) {
    analyticsController.testar(req, res);
});

router.get("/listarQtdVisitas/:fkUsuario", function (req, res) {
    analyticsController.listarQtdVisitas(req, res);
});

router.get("/listarQtdCurtidas/:fkUsuario", function (req, res) {
    analyticsController.listarQtdCurtidas(req, res);
});

router.get("/listarQtdSalvos/:fkUsuario", function (req, res) {
    analyticsController.listarQtdSalvos(req, res);
});

router.get("/listarQtdPosts/", function (req, res) {
    analyticsController.listarQtdPosts(req, res);
});

router.get("/buscarInteracaoHoje/:fkUsuario/:hora", function (req, res) {
    analyticsController.buscarInteracaoHoje(req, res);
});

router.get("/buscarInteracaoAno/:fkUsuario/:mes", function (req, res) {
    analyticsController.buscarInteracaoAno(req, res);
});

module.exports = router;