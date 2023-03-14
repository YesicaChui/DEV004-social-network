/* eslint-disable no-undef */
// Importo la configuracion de firebase
import Firebase from "../firebaseConfig.js";
// pongo los nombres usuales de los objetos y funciones de firebase
const { 
  auth, createUserWithEmailAndPassword, set, ref, database,
} = Firebase;

export const signUp = async (email, password) => {
  // Initialize Firebase
  // const database = getDatabase(FirebaseApp);

  try {
    const credentialsUser = await createUserWithEmailAndPassword(auth, email, password)
    const user = credentialsUser.user;
    await set(ref(database, `users/${user.uid}`), {
      email,
      password,
    })
    // swal('Usuario en la base de datos!');
    console.log("los credenciales son:", credentialsUser)
    // retorno un objeto con el valor true en resultado
    return { resultado: true, code: "" };
  } catch (error) {
    // retorno un objeto con el valor false en resultado y un mensaje de error en code
    return { resultado: false, code: error.code };
  }
};
