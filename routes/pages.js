const express = require("express");
const router = express.Router();

// Este archivo es para enrutar todas las peticiones de las paginas y que sea mas organizado

// app.get("/", (req, res) => {
//     res.send("<h1> Mi nueva APP en Node JS </h1>");
// });

router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    // Solo utiliza la carpeta de views para rendierizar, por eso no ultiliza el html
    res.render("index");
});

// Renderice la pagina login.hbs
router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;
