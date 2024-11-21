const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");



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
 *   post:
 *     tags: [Post]
 *     summary: Agrega nueva publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nuevo post creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Falta el título o el contenido del post
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", auth, postController.newPost);

module.exports = router;