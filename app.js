const express = require("express");
const app = express();

const path = require("path");
const dotenv = require("dotenv");

// Carpeta publica
const publicDirectory = path.join(__dirname, "./public");

// Le decimos a node que utilice los recursos estáticos de la carpeta public
app.use(express.static(publicDirectory));



// Variables de entorno con dotenv
// Le indicamos a dotenv en donde esta el archivo de nuestras variables de entorno
dotenv.config({ path: "./.env" });

// View de HBS (Handle bars), esto para crear vistas (paginas)
app.set("view engine", "hbs");

/**
 * Aqui indicamos que los valores que obtenemis en nuestro forms,
 * vienen como objetos JSON (Parte Json Bodies as sent by API Clients)
 */
app.use(express.json());

/**
 * Aqui indicamos que podemos trabajar con los datos de
 * cualquier formulario dentro de nuestra app
 */
app.use(express.urlencoded({ extended: false }));




const session = require("express-session");

// Objeto de session el cual el navegador lo usa para que la informacion sea consecuente
app.use(session({
        secret: process.env.SECRET_SESSION, // Una clave secreta...
        resave: false, // No guardar la sesion...
        saveUninitialized: true, // No guardar la sesion...
        cookie: {
            secure: false, // Solo para conexiones HTTPS esto falso
            maxAge: 60 * 60 * 1000, // Duracion de la sesion...
            httpOnly: false
        }
    })
);

// Definimos nuestras rutas
app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));



app.listen(5000, () => {
    console.log("Servidor iniciado en el puerto 5000");
});
