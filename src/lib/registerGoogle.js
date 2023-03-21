import Firebase from "../firebaseConfig.js";
// pongo los nombres usuales de los objetos y funciones de firebase
const { 
  auth, GoogleAuthProvider, signInWithPopup,
} = Firebase;

export const registerGoogle = async () => {
  // selecciono el proveedor a utilizar en este caso google
  const provider = new GoogleAuthProvider();

  try {
    // muestro el popup de logeo con google
    const credentials = await signInWithPopup(auth, provider);
    console.log('Tus credenciales son:', credentials);
    return true;
  } catch (error) {
    return false;
  }
};
