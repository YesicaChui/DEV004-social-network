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
  // variable que define si estamos editando o no a una publicacion
  let estadoEdicion = false
  // Se añade el evento click a toda la section donde estan las publicaciones 
  // segun el elemento el elemento pulsado se verifica si es de eliminar, dar like o editar 
  mainPublicacion.addEventListener("click", async (event) => {
    // si el elemento existe y es clase btn-eliminar ingresamos
    if (event.target && event.target.className === "btn-eliminar") {
      console.log("que hay en el targe", event.target.className);
      // Se consulta al usuario si elimina o no la publicacion en el sweetAlert
      const alerta = await swal({
        title: "Realmente desea eliminar el post?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      // si indica que si alerta sera true y realiza la eliminación de la publicacion 
      // enviando el id de la publicacion
      if (alerta) {
        await deletePub(event.target.dataset.id);
        await swal("Se elimino correctamente!", {
          icon: "success",
        });
        // finalmente actualiza la pagina navegando al timeline
        onNavigate("/timeline");
      }
      // si el elemento existe y es clase botonLike ingresamos
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
      // obtengo la publicacion con la funcion getTask y lo guardo en doc
      const doc = await getTask(event.target.dataset.id)
      // Selecciono la etiqueta p de la publicacion que corresponde al boton editar pulsado
      const publicacion = document.getElementById(`${doc.id}`)
      // Selecciono el boton de editar pulsado
      const botonEditar = document.getElementById(`botonEditar${doc.id}`) 
      if (estadoEdicion === false) {
        // modifico el atributo de la etiqueta p para que sea editable
        publicacion.setAttribute('contenteditable', 'true')
        // doy el foco a la etiqueta p para que el usuario visualice que se puede editar
        publicacion.focus();
        // selecciono la todos los hijos de la etiqueta p
        window.getSelection().selectAllChildren(publicacion)
        // indico que el cursor se ubique al final de la etiqueta p
        window.getSelection().collapseToEnd()
        // modifico el texto de editar a guardar  
        botonEditar.innerText = "GUARDAR"
        // cambio el estado de edicion  
        estadoEdicion = true
      } else {
        // vuelvo a poner el p como no editable
        publicacion.setAttribute('contenteditable', 'false')
        // envio el nuevo texto a actualizar a firebase con la funcion actualizarDB  
        await actualizarDB(doc.id, { publicacion: publicacion.innerText })
        // muestro mensaje personalizado de actualizacion correcto  
        swal('Se actualizo la publicacion');
        // cambio el texto del boton de Guardar a nuevamente EDITAR  
        botonEditar.innerText = "EDITAR"
        // Cambio el estado de edición   
        estadoEdicion = false
      }
    }
  });
  // Evento para nueva publicacion//
  document
    .getElementById("nuevaPublicacion")
    .addEventListener("click", () => onNavigate("/crear-publicacion"));
}
