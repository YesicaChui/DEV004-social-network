/* eslint-disable no-undef */
import { registerGoogle } from '../lib/registerGoogle.js';
import { signIn } from '../lib/signIn.js';

// eventos del login-dom
export const loginEventos = (onNavigate) => {
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
  document
    .getElementById('botonRegistrar')
    .addEventListener('click', () => onNavigate('/registro'));
  document
    .getElementById('botonInicioGoogleLogin')
    .addEventListener('click', async () => {
      const estaLogueado = await registerGoogle();
      if (estaLogueado) {
        onNavigate('/timeline');
      } 
    });
  document.getElementById('botonInicio').addEventListener('click', async () => {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    // segun el retorno de signIn en caso true ira a timeline sino mostrara mensaje de error
    const estaLogueado = await signIn(email, password);
    if (estaLogueado) {
      onNavigate('/timeline');
    } else {
      swal('Error: Correo o contraseña incorrecto.');
    }
  });
};
