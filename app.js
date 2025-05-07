const express = require("express");
const app = express();
const path = require("path");

const mysql = require("mysql");
const dotenv = require("dotenv");

// Carpeta publica
const publicDirectory = path.join(__dirname, "./public");

// Le decimos a node que utilice los recursos estáticos de la carpeta public
app.use(express.static(publicDirectory));

/**
 * Aqui indicamos que podemos trabajar con los datos de
 * cualquier formulario dentro de nuestra app
 */
app.use(express.urlencoded({ extended: false }));

/**
 * Aqui indicamos que los valores que obtenemis en nuestro forms,
 * vienen como objetos JSON (Parte Json Bodies as sent by API Clients)
 */
app.use(express.json());

// Variables de entorno con dotenv
// Le indicamos a dotenv en donde esta el archivo de nuestras variables de entorno
dotenv.config({ path: "./.env" });

// Conexion a la abse de datos MySQL
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL Connected to database...");
    }
});

// View de HBS (Handle bars), esto para crear vistas (paginas)
app.set("view engine", "hbs");

// Definimos nuestras rutas
app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
    console.log("Servidor iniciado en el puerto 5000");
});
