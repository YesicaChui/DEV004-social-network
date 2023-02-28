// Import the functions you need from the SDKs you need
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
//importo la configuracion de firebase
import FirebaseApp from '../firebaseConfig.js'
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: 'AIzaSyA4DCQlvHVQ8XYZsIWz5GkEoExfeJsH30s',
  authDomain: 'testsocialnetwork0-b5d33.firebaseapp.com',
  projectId: 'testsocialnetwork0-b5d33',
  storageBucket: 'testsocialnetwork0-b5d33.appspot.com',
  messagingSenderId: '235016872717',
  appId: '1:235016872717:web:31faf95a85c2e8da0cc644',
  measurementId: 'G-DJP89WLW09',
}; */
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const signUp = () => {
  // Initialize Firebase
  const database = getDatabase(FirebaseApp);

  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      set(ref(database, `users/${user.uid}`), {
        email,
        password,
      })
        .then(() => {
          // Data saved successfully!
          alert('Usuario en la base de datos!');
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
      alert('Usuario creado!');
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
};
