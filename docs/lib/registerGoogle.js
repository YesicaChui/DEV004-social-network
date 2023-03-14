import Firebase from "../firebaseConfig.js";
// pongo los nombres usuales de los objetos y funciones de firebase
const { 
  auth, GoogleAuthProvider, signInWithPopup,
} = Firebase;

export const registerGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider);
    console.log('Tus credenciales son:', credentials);
    console.log('Tus credenciales son:', credentials.user.email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
