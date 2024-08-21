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
        res.status(200).send(listaPersonas);
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
    try {
        const persona = await Persona.create(req.body);
        res.status(201).send(persona);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
};


module.exports = {
    home,
    list,
    create
}