const botnRegistrarse = document.getElementById("boton_Registrar");
const botnIniciar = document.getElementById("boton_Iniciar");

const containerIniciar = document.getElementById("container-iniciar");
const containerRegistrar = document.getElementById("container-registrar");

console.log("Hola mundo");

botnRegistrarse.addEventListener("click", (e) => {
    e.preventDefault();
    containerIniciar.classList.add("ocultar-container");
    containerRegistrar.classList.remove("ocultar-container");
});

botnIniciar.addEventListener("click", (e) => {
    e.preventDefault();
    containerRegistrar.classList.add("ocultar-container");
    containerIniciar.classList.remove("ocultar-container");
});
