export const registro = () => {
  const root = document.getElementById('pantallaMostrada');
  root.innerHTML = `
    <main class="PantallaInicio">
      <section class="cajaInicio">
        <img src="./img/img_libro_rojo.png" alt="Imagen de libro">
        <input type="text" placeholder=" Nombre o Nick" id="inputNick">
        <input type="email" placeholder=" Correo Electronico" id="inputEmail">
        <p id="textoCorreoInvalido" class="textoCorreoInvalido">Escribe un correo valido</p>
        <input type="password" placeholder=" Contraseña" id="inputPassword">
        <button id="botonInicio">Registrarse</button>
        <hr style="width:100%;text-align:center">
        <button id="botonInicioGoogle"><img src="./img/btn_google_signin.png" alt="boton de google" class="imgButton"></button>
        <p class="textoCrearCuenta">¿Tienes una cuenta? Ingresa
        <a id="botonAqui" href="#" onclick="console.log('hola mundo')"> aquí!</a></p>
      </section>
    </main>
  `;
};
