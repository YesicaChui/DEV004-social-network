// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

myFunction();

function iniciar(){
  const root = document.getElementById("root")
  root.innerHTML=`
  <main class="PantallaInicio">
    <section class="cajaInicio">
      <img src="./img/img_libro_rojo.png" alt="Imagen de libro">
      <input type="text" placeholder=" Nombre o Nick" id="inputNick">
      <input type="text" placeholder=" Correo Electronico" id="inputEmail">
      <input type="password" placeholder=" Contraseña" id="inputPassword">
      <button id="botonInicio">Ingresar</button>
      <hr style="width:100%;text-align:center">
      <button id="botonInicioGoogle"><img src="./img/btn_google_signin.png" alt="boton de google" class="imgButton"></button>
      <p class="textoCrearCuenta">¿No tienes una cuenta?
      <a id="botonRegistrar" href="#"> Registrate</a></p>
    </section>
  </main> 
  `
  const botonRegistrar = document.getElementById("botonRegistrar")
  botonRegistrar.addEventListener("click",()=>{
    const inputNick = document.getElementById("inputNick")
    const botonInicio = document.getElementById("botonInicio")
    const textoCrearCuenta = document.querySelector(".textoCrearCuenta")
    inputNick.style.display = "block"
    botonInicio.innerHTML = "Registrarse"
    textoCrearCuenta.style.display = "none"
  })
}

iniciar()
