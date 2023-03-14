import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
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
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
// import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import {
  getDatabase, set, ref, update,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
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

// const { app: FirebaseApp } = FirebaseConfig;

// export { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

export const getTask = (id) => getDoc(doc(db, 'Publicaciones', id))

export const actualizarDB = (id, nuevoTexto) => updateDoc(doc(db, 'Publicaciones', id), nuevoTexto)
