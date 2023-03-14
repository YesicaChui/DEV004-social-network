export const timeline = () => {
  const root = document.getElementById('pantallaMostrada');
  root.innerHTML = `
  <div id="publicacion">
    <header class="cabecera">
      <div class="lateral"></div>
      <section class="miLogo">
        <img src="./img/img_libro_rojo.png" alt="imagen libro">
        <h1>LEEME</h1>
      </section>
      <img class="lateral" src="./img/imgPerfil.png" alt="imagen perfil">
    </header>
    <main class="mainPublicacion" id="miPublicacion">
      <button class="botonPublicacion" id="nuevaPublicacion">NUEVA PUBLICACION</button>
      <section id="publicaciones">
        <img src="./img/cargando.gif" alt="imagen cargando">
      </section>
    </main>
  </div>
  `;
};
