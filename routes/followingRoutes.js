const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingController");
const auth = require("../middlewares/authmiddleware");

//const upload = require("../middlewares/uploadMiddleware");

/**
 * @swagger
 * /followings:
 *   post:
 *     tags: [Following]
 *     summary: Agrega nuevo seguimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario_seguido:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Has comenzado a seguir al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  properties:
 *                      id_usuario:
 *                          type: integer
 *                          description: Identificador del seguimiento creado.
 *                      createdAt:
 *                          type: string
 *                          format: date-time
 *                          description: Fecha y hora de creación del seguimiento.
 *       400:
 *         description: No puedes seguirte a ti mismo
 *       401:
 *         description: Ya sigues a este usuario
 *       500:
 *         description: error interno del servidor
 */
router.post("/", auth, followingController.follow);


/**
 * @swagger
 * /followings/{id_usuario_seguido}:
 *   delete:
 *     tags: [Following]
 *     summary: Elimina un seguimiento
 *     parameters:
 *       - in: path
 *         name: id_usuario_seguido
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del seguimiento a eliminar
 *     responses:
 *       200:
 *         description: Seguimiento eliminado
 *       404:
 *         description: Seguimiento no encontrado
 *       500:
 *         description: Error del servidor
*/
router.delete("/:id_usuario_seguido", auth, followingController.unfollow);


module.exports = router;