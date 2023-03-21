// importo la configuracion de firebase del archivo de barril
import Firebase from "../firebaseConfig.js";

// pongo los nombres usuales de los objetos y funciones de firebase
const { 
  auth, signInWithEmailAndPassword, update, ref, database,
} = Firebase;

// lo pongo asincrono para usar el await y esperar su respuesta
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // cuando me logeo correctamente capturo al usuario
    const user = userCredential.user;
    // obtengo la hora y fecha actual
    const lgDate = new Date();
    // actualizo de firebase real time database la fecha y hora del ultimo logeo del usuario
    return update(ref(database, `users/${user.uid}`), {
      last_login: lgDate,
    });
  })
  // si guarda los datos con exito retorna true
  .then(() => true)
  // si hay un error en alguna promesa anterior retorna false
  .catch(() => false);
