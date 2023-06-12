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

router.get("/buscarCurtidaHoje/:fkUsuario/:hora", function (req, res) {
    analyticsController.buscarCurtidaHoje(req, res);
});

router.get("/buscarCurtidaMes/:fkUsuario/:mes", function (req, res) {
    analyticsController.buscarCurtidaMes(req, res);
});

router.get("/buscarSalvoHoje/:fkUsuario/:hora", function (req, res) {
    analyticsController.buscarSalvoHoje(req, res);
});

router.get("/buscarSalvoMes/:fkUsuario/:mes", function (req, res) {
    analyticsController.buscarSalvoMes(req, res);
});

module.exports = router;