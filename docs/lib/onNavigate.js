import { crearPublicacionEventos } from '../components/crearPublicacionEventos.js';
import { loginEventos } from '../components/loginEventos.js';
import { registroEventos } from '../components/registroEventos.js';
import { timelineEventos } from '../components/timelineEventos.js';
import { rutas } from './rutas.js';

// funcion para navegar a travez de las rutas
export const onNavigate = (pathName) => {
  // modificando la ruta en el navegador
  window.history.pushState(
    {},
    pathName,
    window.location.origin + pathName,
  );
  // llamando a la maqueta por su ruta
  rutas[pathName]();
  // llamamos al archivo de Eventos segun ruta de pantalla
  if (pathName === '/') {
    loginEventos(onNavigate);
  }
  if (pathName === '/registro') {
    registroEventos(onNavigate);
  }
  if (pathName === '/timeline') {
    timelineEventos(onNavigate);
  }
  if (pathName === '/crear-publicacion') {
    crearPublicacionEventos(onNavigate);
  }
};
