/* eslint-disable no-undef */
import { signUp } from '../lib/signUp.js';
import { registerGoogle } from '../lib/registerGoogle.js';
import { signIn } from '../lib/signIn.js';

// eventos del registro-dom
export const registroEventos = (onNavigate) => {
  // deteccion de correo valido en la casilla inputEmail si coincide con la expresion regular
  document.getElementById('inputEmail').addEventListener('keyup', () => {
    if (document.getElementById('inputEmail').value
      .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      // habilita el boton de Inicio
      document.getElementById('botonInicio').style['pointer-events'] = 'all';
      // oculta el texto de correo invalido
      document.getElementById('textoCorreoInvalido').style.visibility = 'hidden'
    } else {
      // inhabilita el boton de Inicio
      document.getElementById('botonInicio').style['pointer-events'] = 'none';
      // muestra el texto de correo invalido
      document.getElementById('textoCorreoInvalido').style.visibility = 'visible'
    }
  });
  // agregando evento click para volver al login
  document
    .getElementById('botonAqui')
    .addEventListener('click', () => onNavigate('/'));
  document.getElementById('botonInicioGoogle').addEventListener('click', () => registerGoogle());
  document.getElementById('botonInicio').addEventListener('click', async () => {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    // enviamos a la libreria signUp ( registro) el correo y contraseña y nos devuelve un objeto
    const estaRegistrado = await signUp(email, password);
    if (estaRegistrado.resultado) {
      // si se registra correctamente entonces nos logeamos y navegamos al timeline
      const estaLogueado = await signIn(email, password);
      if (estaLogueado) {
        onNavigate('/timeline');
      } else {
        alert('Error correo o contraseña incorrectos verifiquelos por favor')
      }
      // para el caso de error segun el error mostramos el mensaje
    } else if (estaRegistrado.code === 'auth/email-already-in-use') {
      swal('El correo ya esta en uso');
    } else if (estaRegistrado.code === 'auth/weak-password') {
      swal('La contraseña debe tener 6 digitos como minimo');
    } else {
      swal('Error intentelo de nuevo');
    }
  });
};
