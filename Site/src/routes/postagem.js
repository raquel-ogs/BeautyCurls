var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");

router.get("/", function (req, res) {
    postagemController.testar(req, res);
});

router.get("/listarPenteadosRecentes", function (req, res) {
    postagemController.listarPenteadosRecentes(req, res);
});

router.get("/listarPenteados", function (req, res) {
    postagemController.listarPenteados(req, res);
});

router.get("/listarReceitas", function (req, res) {
    postagemController.listarReceitas(req, res);
});

router.get("/listarPostagem/:idPost", function (req, res) {
    postagemController.listarPostagem(req, res);
});


router.get("/listarPassos/:idPost", function (req, res) {
    postagemController.listarPassos(req, res);
});


router.get("/listarIngredientes/:idPost", function (req, res) {
    postagemController.listarIngredientes(req, res);
});

router.get("/atualizarCurtida/:fkPostagem", function (req, res) {
    postagemController.atualizarCurtida(req, res);
});

router.get("/atualizarSalvo/:fkPostagem", function (req, res) {
    postagemController.atualizarSalvo(req, res);
});

module.exports = router;