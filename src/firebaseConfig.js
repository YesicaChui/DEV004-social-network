// inicializador de firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
// traemos todas las funciones que usamos de firestore
import {
  getFirestore,
  addDoc,
  getDocs,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion, 
  getDoc,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
// traemos todas las funciones que usamos de firebase authentication
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
// traemos todas las funciones que usamos de firebase real time database 
import {
  getDatabase, set, ref, update,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';

// configuración de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA4DCQlvHVQ8XYZsIWz5GkEoExfeJsH30s',
  authDomain: 'testsocialnetwork0-b5d33.firebaseapp.com',
  // le añadi para firestore
  databaseURL: "https://testsocialnetwork0-b5d33-default-rtdb.firebaseio.com",
  projectId: 'testsocialnetwork0-b5d33',
  storageBucket: 'testsocialnetwork0-b5d33.appspot.com',
  messagingSenderId: '235016872717',
  appId: '1:235016872717:web:31faf95a85c2e8da0cc644',
  measurementId: 'G-DJP89WLW09',
};
// inicializamos firebase con la configuración de nuestro proyecto
const app = initializeApp(firebaseConfig);
// obtenemos la autentificacion segun el proyecto
const auth = getAuth(app);
// nos conectamos a firestore
const db = getFirestore(app);
// nos conectamos a real time database
const database = getDatabase(app);
// exporto la configuracion de firebase
export default {
  getDatabase,
  set,
  ref,
  update,
  app,
  db,
  auth,
  addDoc,
  getDocs,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  signInWithEmailAndPassword,
  database,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
}
// obtener un documento por su id de publicaciones
export const getTask = (id) => getDoc(doc(db, 'Publicaciones', id))
// acutalizar un documento por su id enviando el objeto de publicación en la variable nuevoTexto
export const actualizarDB = (id, nuevoTexto) => updateDoc(doc(db, 'Publicaciones', id), nuevoTexto)
