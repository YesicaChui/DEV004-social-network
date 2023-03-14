/* eslint-disable no-undef */
import { firebaseCrearPublicacion } from '../lib/firebasePublicaciones';

// eventos del crear publicacion-dom
export const crearPublicacionEventos = (onNavigate) => {
  document
    .getElementById('crearPublicacion')
    .addEventListener('click', async () => {
      console.log('llamado firebase grupal');
      const textoPublicacion = document.getElementById('textoPublicacion');
      console.log(textoPublicacion.value);
      if (textoPublicacion.value === "") {
        alert("Por favor escriba algun texto para publicar")
        return
      }
      await firebaseCrearPublicacion(textoPublicacion.value);
      await swal('Se inserto la publicacion con éxito');
      onNavigate('/timeline');
    });
};
