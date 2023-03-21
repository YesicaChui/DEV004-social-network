/* eslint-disable no-undef */
// Importo la configuracion de firebase
import Firebase from "../firebaseConfig.js";
// pongo los nombres usuales de los objetos y funciones de firebase
const { 
  auth, createUserWithEmailAndPassword, set, ref, database,
} = Firebase;

export const signUp = async (email, password) => {
  try {
    // creamos un usuario con el correo y contraseña
    const credentialsUser = await createUserWithEmailAndPassword(auth, email, password)
    // obtenemos sus credenciales
    const user = credentialsUser.user;
    // guardamos en firebase real time database su correo y contraseña
    await set(ref(database, `users/${user.uid}`), {
      email,
      password,
    })
    // retorno un objeto con el valor true en resultado
    return { resultado: true, code: "" };
  } catch (error) {
    // retorno un objeto con el valor false en resultado y un mensaje de error en code
    return { resultado: false, code: error.code };
  }
};
