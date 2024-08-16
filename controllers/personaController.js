const db = require("../models");
const Persona = db.persona;

const home = (req, res) => {
    res.status(200).send("Ruta principal de personas");
}

const list = async(req, res) => {

    try {
        const listaPersonas = await Persona.findAll();
        res.status(200).send(listaPersonas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    home,
    list
}