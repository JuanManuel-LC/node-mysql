const express = require("express");
const app = express();
const path = require("path");

// app.get("/", (req, res) => {
//     res.send("<h1> Mi nueva APP en Node JS </h1>");
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
    console.log("Servidor iniciado en el puerto 5000");
});
