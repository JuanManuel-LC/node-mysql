console.log("hola otra vez");

const form = document.getElementById("formRegistro");
const password = document.getElementById("pass_register");
const confirmPassword = document.getElementById("pass_register_");

const labelPassOne = document.getElementById("label-pass-one");
const labelPassTwo = document.getElementById("label-pass-two");
// if (!form) return;

// Creamos un mensaje
const msg = document.createElement("p");
msg.style.fontSize = "0.9em";
msg.style.marginTop = "4px";
confirmPassword.parentNode.appendChild(msg);

function validarPassword() {
    if (confirmPassword.value === "") {
        msg.textContent = "";
        return;
    }

    if (password.value === confirmPassword.value) {
        msg.textContent = "Las contraseñas coinciden";
        msg.style.color = "green";
        password.style.border = "1px solid green";
        confirmPassword.style.border = "1px solid green";
        labelPassOne.style.color = "green";
        labelPassTwo.style.color = "green";
    } else {
        msg.textContent = "Las contraseñas no coinciden";
        msg.style.color = "red";
        password.style.border = "1px solid red";
        confirmPassword.style.border = "1px solid red";
        labelPassOne.style.color = "red";
        labelPassTwo.style.color = "red";
    }
}

password.addEventListener("input", validarPassword);
confirmPassword.addEventListener("input", validarPassword);

form.addEventListener("submit", function (e) {
    console.log("Se dio clic");

    if (password.value !== confirmPassword.value) {
        e.preventDefault(); // Previene que se envíe el formulario
        alert("Las contraseñas no coinciden");
    }
});
