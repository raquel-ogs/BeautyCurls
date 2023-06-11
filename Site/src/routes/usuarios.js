var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/verificarUser/:nomeUser", function (req, res) {
    usuarioController.verificarUser(req, res);
});

router.get("/verificarEmail/:emailUser", function (req, res) {
    usuarioController.verificarEmail(req, res);
});

router.get("/listarFotoPerfil", function (req, res) {
    usuarioController.listarFotoPerfil(req, res);
});


router.get("/verificarQtdFotoPerfil", function (req, res) {
    usuarioController.verificarQtdFotoPerfil(req, res);
});

router.get("/verificarCurtida/:fkUsuario/:fkPostagem", function (req, res) {
    usuarioController.verificarCurtida(req, res);
});

router.get("/verificarSalvo/:fkUsuario/:fkPostagem", function (req, res) {
    usuarioController.verificarSalvo(req, res);
});

router.get("/listarPostsCurtidos/:fkUsuario", function (req, res) {
    usuarioController.listarPostsCurtidos(req, res);
});

router.get("/verificarQtdCurtida/:fkUsuario/", function (req, res) {
    usuarioController.verificarQtdCurtida(req, res);
});

router.get("/listarPostsSalvos/:fkUsuario", function (req, res) {
    usuarioController.listarPostsSalvos(req, res);
});

router.get("/verificarQtdSalvo/:fkUsuario/", function (req, res) {
    usuarioController.verificarQtdSalvo(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/adicionarVisita", function (req, res) {
    usuarioController.adicionarVisita(req, res);
})

router.post("/adicionarCurtida", function (req, res) {
    usuarioController.adicionarCurtida(req, res);
})

router.post("/adicionarSalvo", function (req, res) {
    usuarioController.adicionarSalvo(req, res);
})

router.put("/atualizarDadosPessoais/:idUsuario", function (req, res) {
    usuarioController.atualizarDadosPessoais(req, res);
});

router.put("/atualizarFotoPerfil/:idUsuario", function (req, res) {
    usuarioController.atualizarFotoPerfil(req, res);
});

router.delete("/apagarCurtida", function (req, res) {
    usuarioController.apagarCurtida(req, res);
})

router.delete("/apagarSalvo", function (req, res) {
    usuarioController.apagarSalvo(req, res);
})

module.exports = router;