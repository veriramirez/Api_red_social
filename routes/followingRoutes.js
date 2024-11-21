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

/**
 * @swagger
 * /followings/{id}:
 *   get:
 *     tags: [Following]
 *     summary: Obtiene los usuarios que sigue un usuario específico
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario cuyos seguidos se quieren obtener
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos por el usuario especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get('/:id', auth, followingController.getFollowing);


/**
 * @swagger
 * /followings/{id}/followers:
 *   get:
 *     tags: [Users]
 *     summary: Obtiene la lista de seguidores de un usuario
 *     description: Devuelve un listado de usuarios que siguen al usuario especificado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de seguidores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/followers', auth, followingController.getFollowers);



/**
 * @swagger
 * /followings/MutualFollowers:
 *   get:
 *     tags: [Users]
 *     summary: Obtiene la lista de usuarios que siguen al usuario autenticado y que también son seguidos por él (seguidores mutuos)
 *     description: Devuelve un listado de usuarios con los que hay una relación de seguimiento mutuo. Necesita autenticación para acceder.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de seguidores mutuos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get('/MutualFollowers', auth, followingController.getMutualFollowers);

module.exports = router;