export const crearPublicacion = () => {
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
    <main class="mainPublicacion">      
        <textarea class="miPublicacionCrear" placeholder="Escriba su publicación aqui" id="textoPublicacion"></textarea>      
      <button class="botonPublicacion" id="crearPublicacion">PUBLICAR</button>      
    </main>
  </div>
  `;
};
