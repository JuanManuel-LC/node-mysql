const mysql = require("mysql");

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

exports.login = (req, res) => {
    console.log(req.body);
    //res.send("Form submited")
    // En una funcion no se puede usar un send y un render al mismo tiempo, no funcionará

    const email = req.body.email;
    const password = req.body.password;

    // En el parcial sera un insert para insertar usuarios a la tabla Users en la DB
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async function (error, results) {
            if (error) {
                console.log(error);
            }

            // Si en los resultados tenemos por lo menos 1 registro 1 fila
            if (results.length > 0) {
                console.log(results);
                var data = JSON.parse(JSON.stringify(results));

                // console.log(data)
                console.log(data[0].name);

                var user_id = data[0].id;
                var user_name = data[0].name;
                var user_email = data[0].email;
                var user_password = data[0].password;

                if (user_email == email && user_password == password) {
                    console.log("¡Login exitoso!");

                    req.session.user = {
                        id: user_id,
                        name: user_name,
                        email: user_email,
                    };

                    // console.log()

                    message = `Bienvenido a tu portal ${user_name}`;

                    console.log(req.session.user);

                    return res.render("login", {
                        message,
                    });
                }
            } else {
                res.render("index", {
                    // Vamos a enviar un valor a la pagina de incio, que es un mensaje
                    message: "El usuario NO existe en la DB",
                });
            }
        }
    );
};

exports.logout = (req, res) => {
    console.log("Cerrar sesion");

    console.log("sesion a borrar: ", req.session);
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session: ", err);
        }
        res.clearCookie("connect.sid");
        res.redirect("/"); // Nos redirige hacia el "/" ya que luego de ahi se interpreta el index
    });
};

exports.register = (req, res) => {
    console.log(req.body);
    const name = req.body.name_register;
    const email = req.body.email_register;
    const password = req.body.password_register;

    db.query(
        "SELECT email FROM users WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.render("index", {
                    message: "Error de base de datos",
                });
            }

            if (results.length > 0) {
                return res.render("index", {
                    message: "El correo ya está registrado",
                });
            }

            db.query(
                "INSERT INTO users SET ?",
                { name, email, password },
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.render("index", {
                            message: "Error al registrar usuario",
                        });
                    }

                    return res.render("index", {
                        message: "¡Usuario registrado con éxito!",
                    });
                }
            );
        }
    );
};
