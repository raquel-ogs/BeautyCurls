var express = require("express");
var router = express.Router();

var curvaturaController = require("../controllers/curvaturaController");

router.get("/", function (req, res) {
    curvaturaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    curvaturaController.listar(req, res);
});

module.exports = router;