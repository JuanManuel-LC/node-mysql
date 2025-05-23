const express = require("express");
const AuthController = require("../controllers/auth");
const router = express.Router();

/**
 * Solo podesmo acceder a este router a través de POST
 * Cuando en el formulario presionamos el botón (submit)
 * Accederemos a través del metodo POST que pusimos en el
 * HTML
 */
router.post("/login", AuthController.login);
/**
 * Aqui NO vamos a ir a renderizar nada
 * vamos a llamar un Controller que trasará con
 * toda la informacion y los datos que entrega el form
 */

/**
 * roter.post('/register'AuthController.logout);
 */

/**
 * Aqui vamos a llamar a nuestro Controller que
 * se encarga de cerrar la sesión
 */
router.post('/logout', AuthController.logout);

router.post('/register', AuthController.register);

// Exportamos nuestro enrutador para que lo podamos usar en toda la app
module.exports = router;
