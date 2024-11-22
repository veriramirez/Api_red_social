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





//permite modificar el post
//buscar el post del usuario
//si no tiene post mensaje
//si tiene post actualizar
const updatePosts = async (req, res) => {
    try {
      const id_usuario = req.user.id;
      const { id_post } = req.params;
      const { titulo, contenido } = req.body;
  
      const listaPost = await Post.findOne({ where: {id:id_post, id_usuario:id_usuario } });
  
      if (!listaPost) {
        return res.status(404).send({ error: 'El usuario no tiene posts' });
      }
  
      listaPost.titulo = titulo;
      listaPost.contenido = contenido;
      await listaPost.save();
  
      // Retrieve the updated post data after saving
      const updatedPost = await Post.findByPk(id_post);
  
      res.status(200).send({
        message: "Publicacion actualizada",
        post: updatedPost, // Include the updated post in the response
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error de servidor" });
    }
  };


//para eliminar post
//quiero traer los id_post que tenga id_usuario
//si el id_post a eliminar existe, se elimina 
const deletePost = async (req, res) => {
    const id_usuario = req.user.id;
    const { id_post } = req.params;
  
    try {
      const deletedPost = await Post.destroy({
        where: {
          id: id_post,
          id_usuario: id_usuario
        }
      });
  
      if (deletedPost === 0) {
        return res.status(404).json({ message: 'Post no encontrado' });
      }
  
      res.status(200).json({ message: 'Post borrado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error de servidor' });
    }
  };


  
module.exports = {
    newPost,
    listgetposts,
    updatePosts,
    deletePost,
};