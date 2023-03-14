/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { 
  firebaseLeerPublicacion, deletePub, firebaseDarLike, firebaseQuitarLike, 
} from '../lib/firebasePublicaciones';
import { getTask, actualizarDB } from "../firebaseConfig.js";

// eventos del muro(time-line)
export const timelineEventos = async (onNavigate) => {
  // las publicaciones ahora las pongo dentro de Section publicaciones
  const mainPublicacion = document.getElementById('publicaciones');
  // ahora reemplazo el contenido por completo de section cada vez que se llame
  mainPublicacion.innerHTML = await firebaseLeerPublicacion();

  let estadoEdicion = false

  // Evento para porder eliminar publicaciones//  
  mainPublicacion.addEventListener("click", async (event) => {
    if (event.target && event.target.className === "btn-eliminar") {
      console.log("que hay en el targe", event.target.className);
      const alerta = await swal({
        title: "Realmente desea eliminar el post?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (alerta) {
        await deletePub(event.target.dataset.id);
        await swal("Se elimino correctamente!", {
          icon: "success",
        });
        onNavigate("/timeline");
      }
    } else if (event.target && event.target.className === "botonLike") {
      // agregando un semaforo para indicar que ya se pulso el boton y no repetir todo el proceso     
      if (event.target.dataset.activado === "false") return;
      // cambiando el valor del semaforo para que no se pueda pulsar nuevamente
      event.target.dataset.activado = false
      
      // guardo en nombre de archivo solo el nombre que esta en su src
      // para ello divido la cadena con split con el separador / y busco el ultimo elemento traido con el pop
      const nombreArchivo = event.target.src.split('/').pop();
      // si el nombre del archivo es likeVacio debo de dar like sino quito el like
      if (nombreArchivo === "likeVacio.png") {
        await firebaseDarLike(event.target.dataset.identificador)
      } else {
        await firebaseQuitarLike(event.target.dataset.identificador)
      }
      // vuelvo a pintar todas las publicaciones actualizando su like
      timelineEventos(onNavigate)
    } else if (event.target && event.target.className === "botonEditar") { // Evento para editar publicaciones
      const doc = await getTask(event.target.dataset.id)
      const publicacion = document.getElementById(`${doc.id}`)
      const botonEditar = document.getElementById(`botonEditar${doc.id}`) 
      if (estadoEdicion === false) {
        publicacion.setAttribute('contenteditable', 'true')
        publicacion.focus();
        window.getSelection().selectAllChildren(publicacion)
        window.getSelection().collapseToEnd()  
        botonEditar.innerText = "GUARDAR"
        // console.log("botonEditar.innerText = " + botonEditar.innerText + " cambiando a 'Guardar'")
        estadoEdicion = true
        // console.log("estadoEdicion = " + estadoEdicion)
      } else {
        publicacion.setAttribute('contenteditable', 'false')
        await actualizarDB(doc.id, { publicacion: publicacion.innerText })
        swal('Se acualizo la publicacion');
        botonEditar.innerText = "EDITAR"
        // console.log("botonEditar.innerText = " + botonEditar.innerText + " cambiando a 'Editar'")    
        estadoEdicion = false
        // console.log("estadoEdicion = " + estadoEdicion)
      }
    }
  });
  // Evento para nueva publicacion//
  document
    .getElementById("nuevaPublicacion")
    .addEventListener("click", () => onNavigate("/crear-publicacion"));
}
