const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models'); 
const Post = db.Post; 
const upload = require("../middlewares/uploadMiddleware");


//POST / Crea una nueva publicación (requiere autenticación).
const newPost = async (req, res) => {
    const { titulo, contenido } =req.body;
    if (!titulo || !contenido){
        return res.status(400).send({ message: "Falta el título o el contenido del post" });
    }
    try {
        const newPost = await Post.create({
            id_usuario:req.user.id,
            titulo: titulo,
            contenido: contenido,
        });
        res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send({ message: "Error al crear el post" });
        console.error(error);
    }
};



//que muestre todos los posts
//si no tiene que informe
//si sale otro error que sea de servidor
const listgetposts = async(req, res) => {
    try {
        const listaPost = await Post.findAll();

        if (listaPost.length > 0) {
            res.status(200).send(listaPost);
        } else {
            res.status(404).send({ error: 'No hay post' });
        }
    } catch (error) {
        res.status(500).send({message: "error de servidor"});
    }
};






module.exports = {
    newPost,
    listgetposts,
};