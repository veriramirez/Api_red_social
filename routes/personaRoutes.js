const express = require("express");
const router = express.Router();
const personaController = require("../controllers/personaController");

router.get("/", personaController.home);
router.get("/list", personaController.list);
router.post("/create", personaController.create);

module.exports = router;