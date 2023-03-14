// importo la configuracion de firebase del archivo de barril
import Firebase from "../firebaseConfig.js";

// pongo los nombres usuales de los objetos y funciones de firebase
const { 
  auth, signInWithEmailAndPassword, update, ref, database,
} = Firebase;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const database = getDatabase(Firebase);

// lo pongo asincrono para usar el await y esperar su respuesta
export const signIn = async (email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    const lgDate = new Date();
    console.log('Que es esto en el signIn', user.email)
    return update(ref(database, `users/${user.uid}`), {
      last_login: lgDate,
    });
  })
  .then(() => {
    // User logged successfully
    console.log('Usuario logueado!');
    return true;
    /*  })
     .catch((error) => {
       // Log in failed...
       alert(error);
       return false
     });     */
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    return false;
  });
