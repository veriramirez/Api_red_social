const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");


/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     summary: Crea un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Title of the post
 *                 required: true
 *               contenido:
 *                 type: string
 *                 description: Content of the post
 *                 required: true
 *     responses:
 *       201:
 *         description: Post creado satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   description: Titulo del post
 *                 contenido:
 *                   type: string
 *                   description: contenido del post
 *       400:
 *         description: Falta el título o el contenido del post
 *       500:
 *         description: Error de servidor
 */

router.post("/", auth, postController.newPost);




/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_usuario:
 *           type: integer
 *         titulo:
 *           type: string
 *         contenido:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 * /posts:
 *   get:
 *     tags: [Post]
 *     summary: Lista todas las publicaciones
 *     security:
 *       - ApiTokenAuth: []
 *     responses:
 *       200:
 *         description: Muestra lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: No hay posts
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", auth, postController.listgetposts);




/**
 * @swagger
 * /posts/{id_post}:
 *   put:
 *     tags: [Posts]
 *     summary: Modifica un post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: id_post
 *         in: path
 *         description: Id de post a modificar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Nuevo título del post
 *               contenido:
 *                 type: string
 *                 description: Nuevo contenido del post
 *     responses:
 *       200:
 *         description: Post actualizado correctamente
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error de servidor
 */
router.put("/:id_post", auth, postController.updatePosts);




/**
 * @swagger
 * /posts/{id_post}:
 *   delete:
 *     tags: [Posts]
 *     summary: Elimina un post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id_post
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post a eliminar
 *     responses:
 *       200:
 *         description: post eliminado
 *       404:
 *         description: post no encontrado
 *       500:
 *         description: Error del servidor
*/

router.delete("/:id_post", auth, postController.deletePost);


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_usuario:
 *           type: integer
 *         titulo:
 *           type: string
 *         contenido:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 * /posts/{id_post}:
 *   get:
 *     tags: [Post]
 *     summary: Obtiene una publicación específica
 *     parameters:
 *       - in: path
 *         name: id_post
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la publicación
 *     security:
 *       - ApiTokenAuth: []
 *     responses:
 *       200:
 *         description: Publicación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Publicación no encontrada
 *       403:
 *         description: No tienes permiso para ver esta publicación
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id_post", auth, postController.getPost);



//GET /user-posts/:id Muestra los posts de un usuario determinado
//(requiere autenticación; solo accesible si sigo a dicho usuario

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_usuario:
 *           type: integer
 *         titulo:
 *           type: string
 *         contenido:
 *           type: string
 *
 * /posts/user-posts/{id_usuario_seguido}:
 *   get:
 *     tags:
 *       - Post
 *     summary: Devuelve una lista de posts del usuario especificado si el usuario autenticado lo sigue.
 *     parameters:
 *       - in: path
 *         name: id_usuario_seguido
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario cuyos posts se quieren obtener
 *     responses:
 *       200:
 *         description: Lista de posts del usuario seguido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       403:
 *         description: No tienes permiso para ver los posts de este usuario
 *       404:
 *         description: No se encontraron posts para este usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get("/user-posts/:id_usuario_seguido", auth, postController.listgetpostsseguido);
module.exports = router;