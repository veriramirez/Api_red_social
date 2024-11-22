Informe de ApiRest de Red Social

El objetivo del trabajo propuesto por el docente fue desarrollar una API REST utilizando Node.js, Express,MySQL como base de datos y Swagger, que sirva de backend para el uso de una red social. El uso de swagger sirvió como herramienta para ayudarme en el desarrollo, diseño y documentación de mi API REST.

El proyecto se creó con tres tablas principales: Usuario, Post y Following, cada una de ellas con sus respectivas funcionalidades.

Se creo una nueva base de datos en mySQL Workbench llamada mi-api que se sincronizo al proyecto en el archivo config.js y sobre la cual se agregaron las tablas y columnas que se definieron en en el proyecto.

En el carpeta models se creo el archivo post.js y se definio el modelo de cada post donde se agrego un id cada cada post creado qeu luego fue usado en distintas funcionalidades de postCorntroller.

El archivo .env/example se modificó el nombre a .env cuando se agrego la contraseña para ttrabajar el proyecto de manera local.

En el archivo index del proyecto sume la ruta app.use("/api/posts", postRouter) y la importación para su uso const postRouter = require("./routes/postRoutes").

En la tabla Usuario se continuo con la definicion de la función login en el archivo usuarioController y en la UsuarioRoutes se creo la ruta /login con el método post con su documentación swgagger que solicita ingresar mail y contraseña para loguear al usuario. Se corrigieron elaboración de respuestas y de errores. Lo demas ya habia sido proporcionado por el docente.

Continuando con la tabla Followings, en followingController se crearon las funciones follow para seguir un usuario, unfollow para eliminar un seguimiento verificado previamente si el id a eliminar es seguido por el usuario, getFollowing que obtiene la lista de seguidores de un usuario, getFollowers para mostrar los usuarios que sigue uno específico y que primero verifica que el ususario se esté siguiendo a lo que develve verdadero o falso para poder eliminar el seguimiento;  getMutualFollower para obtener los usuarios que se siguen mutuamente cada una con su respectiva documentación swagger y la ruta definida de cada una de ellas. 

En la tabla Post se crearon las funciones en el archivo postController.js: newPost para crear un nuevos posteo, listgetposts que obtiene la lsita de todas las publicaciones, updatePosts que actualiza un post identificado por id, deletePost que elimina un post identificado por id, getPost que obtiene un post en particular, listgetpostsseguido que obtiene las publicaciones que hizo un usuario seguido.

En la documentacion swagger tuve una complicación que venía de los componenetes de seguridad de esquema donde la autorización del header ya estaba definida en la configuración del swagger y que no era necesaria agregarla en los componentes. Otra complicación me surgió en el archivo index del proyecto respecto a la ruta following que no podia definirla. 

En términos generales se presentaron distintos inconvenientes que pudieron resolverse exitosamente como la definición de rutas, problemas de identación de documentación swagger, la necesidad de  crear un id para los post lo cual se usó luego para identificar el post que se queria eliminar o mostrar


