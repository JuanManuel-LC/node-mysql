const express = require("express");
const app = express();
const path = require("path");

const mysql = require("mysql");
const dotenv = require("dotenv");

// Carpeta publica
const publicDirectory = path.join(__dirname, "./public");

// Le decimos a node que utilice los recursos estáticos de la carpeta public
app.use(express.static(publicDirectory));

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

// app.get("/", (req, res) => {
//     res.send("<h1> Mi nueva APP en Node JS </h1>");
// });

app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    // Solo utiliza la carpeta de views para rendierizar, por eso no ultiliza el html
    res.render("index");
});

app.listen(5000, () => {
    console.log("Servidor iniciado en el puerto 5000");
});
