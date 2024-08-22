const db = require("../models");
const Persona = db.persona;

const home = (req, res) => {
    res.status(200).send("Ruta principal de personas");
}

/* 
Esta función es un controlador asíncrono que maneja la solicitud para listar 
todas las personas almacenadas en la base de datos.
Utiliza el modelo 'Persona' para buscar y recuperar todos los registros (findAll()), y los 
devuelve como respuesta en formato JSON con un código de estado 200 (OK).
En caso de que ocurra un error durante la consulta a la base de datos, 
se captura (catch) y se devuelve un mensaje de error con un código de estado 500 
(Error Interno del Servidor).
*/
const list = async(req, res) => {
    try {
        const listaPersonas = await Persona.findAll();
        if (listaPersonas.length > 0) {
            res.status(200).send(listaPersonas);
        } else {
            res.status(404).send({ message: "Aun no hay registros" });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

/* 
Esta función es un controlador asíncrono que maneja la solicitud para crear 
una nueva persona en la base de datos. Utiliza el modelo 'Persona' para 
crear un nuevo registro (create) basado en los datos proporcionados en el cuerpo 
de la solicitud (req.body), y devuelve la nueva persona con un código 
de estado 201 (Creado). Si ocurre un error durante el proceso, se captura 
y se devuelve un mensaje de error con un código de estado 500 
(Error Interno del Servidor).
*/
const create = async(req, res) => {
    const { nombre, mail, edad } = req.body;
    if (!nombre || !mail || !edad) {
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try {
        const persona = await Persona.create(req.body);
        res.status(201).send(persona);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).send({ message: "Mail ya existente" });
        } else {
            res.status(500).send({
                message: error.message,
                nombre: error.name
            });
        }
    }
};

const findById = async(req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (persona) {
            res.status(200).send(persona);
        } else {
            res.status(404).send({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del server" });
    }
}

module.exports = {
    home,
    list,
    create,
    findById
}