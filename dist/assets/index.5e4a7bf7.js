import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, getDoc, doc as doc$1, updateDoc as updateDoc$1, addDoc as addDoc$1, getDocs as getDocs$1, collection as collection$1, deleteDoc as deleteDoc$1, arrayRemove as arrayRemove$1, arrayUnion as arrayUnion$1 } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword as signInWithEmailAndPassword$1, createUserWithEmailAndPassword as createUserWithEmailAndPassword$1, GoogleAuthProvider as GoogleAuthProvider$1, signInWithPopup as signInWithPopup$1 } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, set as set$1, ref as ref$2, update as update$1 } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const firebaseConfig = {
  apiKey: "AIzaSyA4DCQlvHVQ8XYZsIWz5GkEoExfeJsH30s",
  authDomain: "testsocialnetwork0-b5d33.firebaseapp.com",
  databaseURL: "https://testsocialnetwork0-b5d33-default-rtdb.firebaseio.com",
  projectId: "testsocialnetwork0-b5d33",
  storageBucket: "testsocialnetwork0-b5d33.appspot.com",
  messagingSenderId: "235016872717",
  appId: "1:235016872717:web:31faf95a85c2e8da0cc644",
  measurementId: "G-DJP89WLW09"
};
const app = initializeApp(firebaseConfig);
const auth$4 = getAuth(app);
const db$1 = getFirestore(app);
const database$2 = getDatabase(app);
const Firebase = {
  getDatabase,
  set: set$1,
  ref: ref$2,
  update: update$1,
  app,
  db: db$1,
  auth: auth$4,
  addDoc: addDoc$1,
  getDocs: getDocs$1,
  doc: doc$1,
  collection: collection$1,
  deleteDoc: deleteDoc$1,
  updateDoc: updateDoc$1,
  arrayRemove: arrayRemove$1,
  arrayUnion: arrayUnion$1,
  signInWithEmailAndPassword: signInWithEmailAndPassword$1,
  database: database$2,
  createUserWithEmailAndPassword: createUserWithEmailAndPassword$1,
  GoogleAuthProvider: GoogleAuthProvider$1,
  signInWithPopup: signInWithPopup$1
};
const getTask = (id) => getDoc(doc$1(db$1, "Publicaciones", id));
const actualizarDB = (id, nuevoTexto) => updateDoc$1(doc$1(db$1, "Publicaciones", id), nuevoTexto);
const {
  db,
  auth: auth$3,
  addDoc,
  getDocs,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion
} = Firebase;
const firebaseCrearPublicacion = async (texto) => {
  await addDoc(collection(db, "Publicaciones"), {
    publicacion: texto,
    email: auth$3.currentUser.email
  });
  console.log("dato insertado");
};
const firebaseLeerPublicacion = async () => {
  const querySnapshot = await getDocs(collection(db, "Publicaciones"));
  let HtmlString = "";
  for (let i = 0; i < querySnapshot.docs.length; i += 1) {
    const document2 = querySnapshot.docs[i];
    const likesArray = document2.data().likes || [];
    const tieneLike = likesArray.includes(auth$3.currentUser.email);
    HtmlString += ` 
      <article class='miPublicacion'>
        <div class="cabeceraPublicacion">
          <span>${document2.data().email}</span>
          <div class="likes">
            <span>${likesArray.length}</span>
            <img class="botonLike" data-activado="true" data-identificador=${document2.id} src=${tieneLike ? "./img/likeLleno.png" : "./img/likeVacio.png"} alt="Imagen de Like">
          </div>
        </div>      
        <p contenteditable="false" id=${document2.id}>${document2.data().publicacion}</p>
        ${document2.data().email === auth$3.currentUser.email ? `<section class='btns'> 
        <button class='btn-eliminar' data-id="${document2.id}">ELIMINAR</button>
        <button id="botonEditar${document2.id}" class='botonEditar' data-id="${document2.id}">EDITAR</button>
        </section>` : ""}     
      </article>
    `;
  }
  return HtmlString;
};
const deletePub = async (id) => deleteDoc(await doc(db, "Publicaciones", id));
const firebaseDarLike = async (id) => {
  const user = auth$3.currentUser;
  await updateDoc(doc(db, "Publicaciones", id), {
    likes: arrayUnion(user.email)
  });
};
const firebaseQuitarLike = async (id) => {
  const user = auth$3.currentUser;
  await updateDoc(doc(db, "Publicaciones", id), {
    likes: arrayRemove(user.email)
  });
};
const crearPublicacionEventos = (onNavigate2) => {
  document.getElementById("crearPublicacion").addEventListener("click", async () => {
    console.log("llamado firebase grupal");
    const textoPublicacion = document.getElementById("textoPublicacion");
    console.log(textoPublicacion.value);
    if (textoPublicacion.value === "") {
      alert("Por favor escriba algun texto para publicar");
      return;
    }
    await firebaseCrearPublicacion(textoPublicacion.value);
    await swal("Se inserto la publicacion con \xE9xito");
    onNavigate2("/timeline");
  });
};
const {
  auth: auth$2,
  GoogleAuthProvider,
  signInWithPopup
} = Firebase;
const registerGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth$2, provider);
    console.log("Tus credenciales son:", credentials);
    console.log("Tus credenciales son:", credentials.user.email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const {
  auth: auth$1,
  signInWithEmailAndPassword,
  update,
  ref: ref$1,
  database: database$1
} = Firebase;
const signIn = async (email, password) => signInWithEmailAndPassword(auth$1, email, password).then((userCredential) => {
  const user = userCredential.user;
  const lgDate = new Date();
  console.log("Que es esto en el signIn", user.email);
  return update(ref$1(database$1, `users/${user.uid}`), {
    last_login: lgDate
  });
}).then(() => {
  console.log("Usuario logueado!");
  return true;
}).catch((error) => {
  const errorMessage = error.message;
  console.log(errorMessage);
  return false;
});
const loginEventos = (onNavigate2) => {
  document.getElementById("inputEmail").addEventListener("keyup", () => {
    if (document.getElementById("inputEmail").value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      document.getElementById("botonInicio").style["pointer-events"] = "all";
      document.getElementById("textoCorreoInvalido").style.visibility = "hidden";
    } else {
      document.getElementById("botonInicio").style["pointer-events"] = "none";
      document.getElementById("textoCorreoInvalido").style.visibility = "visible";
    }
  });
  document.getElementById("botonRegistrar").addEventListener("click", () => onNavigate2("/registro"));
  document.getElementById("botonInicioGoogleLogin").addEventListener("click", async () => {
    const estaLogueado = await registerGoogle();
    if (estaLogueado) {
      onNavigate2("/timeline");
    }
  });
  document.getElementById("botonInicio").addEventListener("click", async () => {
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const estaLogueado = await signIn(email, password);
    if (estaLogueado) {
      onNavigate2("/timeline");
    } else {
      swal("Error: Correo o contrase\xF1a incorrecto.");
    }
  });
};
const {
  auth,
  createUserWithEmailAndPassword,
  set,
  ref,
  database
} = Firebase;
const signUp = async (email, password) => {
  try {
    const credentialsUser = await createUserWithEmailAndPassword(auth, email, password);
    const user = credentialsUser.user;
    await set(ref(database, `users/${user.uid}`), {
      email,
      password
    });
    console.log("los credenciales son:", credentialsUser);
    return { resultado: true, code: "" };
  } catch (error) {
    return { resultado: false, code: error.code };
  }
};
const registroEventos = (onNavigate2) => {
  document.getElementById("inputEmail").addEventListener("keyup", () => {
    if (document.getElementById("inputEmail").value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      document.getElementById("botonInicio").style["pointer-events"] = "all";
      document.getElementById("textoCorreoInvalido").style.visibility = "hidden";
    } else {
      document.getElementById("botonInicio").style["pointer-events"] = "none";
      document.getElementById("textoCorreoInvalido").style.visibility = "visible";
    }
  });
  document.getElementById("botonAqui").addEventListener("click", () => onNavigate2("/"));
  document.getElementById("botonInicioGoogle").addEventListener("click", () => registerGoogle());
  document.getElementById("botonInicio").addEventListener("click", async () => {
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const estaRegistrado = await signUp(email, password);
    if (estaRegistrado.resultado) {
      const estaLogueado = await signIn(email, password);
      if (estaLogueado) {
        onNavigate2("/timeline");
      } else {
        alert("Error correo o contrase\xF1a incorrectos verifiquelos por favor");
      }
    } else if (estaRegistrado.code === "auth/email-already-in-use") {
      swal("El correo ya esta en uso");
    } else if (estaRegistrado.code === "auth/weak-password") {
      swal("La contrase\xF1a debe tener 6 digitos como minimo");
    } else {
      swal("Error intentelo de nuevo");
    }
  });
};
const timelineEventos = async (onNavigate2) => {
  const mainPublicacion = document.getElementById("publicaciones");
  mainPublicacion.innerHTML = await firebaseLeerPublicacion();
  let estadoEdicion = false;
  mainPublicacion.addEventListener("click", async (event) => {
    if (event.target && event.target.className === "btn-eliminar") {
      console.log("que hay en el targe", event.target.className);
      const alerta = await swal({
        title: "Realmente desea eliminar el post?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      });
      if (alerta) {
        await deletePub(event.target.dataset.id);
        await swal("Se elimino correctamente!", {
          icon: "success"
        });
        onNavigate2("/timeline");
      }
    } else if (event.target && event.target.className === "botonLike") {
      if (event.target.dataset.activado === "false")
        return;
      event.target.dataset.activado = false;
      const nombreArchivo = event.target.src.split("/").pop();
      if (nombreArchivo === "likeVacio.png") {
        await firebaseDarLike(event.target.dataset.identificador);
      } else {
        await firebaseQuitarLike(event.target.dataset.identificador);
      }
      timelineEventos(onNavigate2);
    } else if (event.target && event.target.className === "botonEditar") {
      const doc2 = await getTask(event.target.dataset.id);
      const publicacion = document.getElementById(`${doc2.id}`);
      const botonEditar = document.getElementById(`botonEditar${doc2.id}`);
      if (estadoEdicion === false) {
        publicacion.setAttribute("contenteditable", "true");
        publicacion.focus();
        window.getSelection().selectAllChildren(publicacion);
        window.getSelection().collapseToEnd();
        botonEditar.innerText = "GUARDAR";
        estadoEdicion = true;
      } else {
        publicacion.setAttribute("contenteditable", "false");
        await actualizarDB(doc2.id, { publicacion: publicacion.innerText });
        swal("Se acualizo la publicacion");
        botonEditar.innerText = "EDITAR";
        estadoEdicion = false;
      }
    }
  });
  document.getElementById("nuevaPublicacion").addEventListener("click", () => onNavigate2("/crear-publicacion"));
};
const crearPublicacion = () => {
  const root = document.getElementById("pantallaMostrada");
  root.innerHTML = `
  <div id="publicacion">
    <header class="cabecera">
      <div class="lateral"></div>
      <section class="miLogo">
        <img src="./img/img_libro_rojo.png" alt="imagen libro">
        <h1>LEEME</h1>
      </section>
      <img class="lateral" src="./img/imgPerfil.png" alt="imagen perfil">
    </header>
    <main class="mainPublicacion">      
        <textarea class="miPublicacionCrear" placeholder="Escriba su publicaci\xF3n aqui" id="textoPublicacion"></textarea>      
      <button class="botonPublicacion" id="crearPublicacion">PUBLICAR</button>      
    </main>
  </div>
  `;
};
const login = () => {
  const root = document.getElementById("pantallaMostrada");
  root.innerHTML = `
    <main class="PantallaInicio">
      <section class="cajaInicio">
        <img src="./img/img_libro_rojo.png" alt="Imagen de libro">
        <input type="text" placeholder=" Correo Electronico" id="inputEmail">
        <p id="textoCorreoInvalido" class="textoCorreoInvalido">Escribe un correo valido</p>
        <input type="password" placeholder=" Contrase\xF1a" id="inputPassword">
        <button id="botonInicio">Ingresar</button>
        <hr style="width:100%;text-align:center">
        <button id="botonInicioGoogleLogin"><img src="./img/btn_google_signin.png" alt="boton de google" class="imgButton"></button>
        <p class="textoCrearCuenta">\xBFNo tienes una cuenta?
        <a id="botonRegistrar" href="#" onclick="console.log('hola mundo')"> Registrate</a></p>
      </section>
    </main>
  `;
};
const registro = () => {
  const root = document.getElementById("pantallaMostrada");
  root.innerHTML = `
    <main class="PantallaInicio">
      <section class="cajaInicio">
        <img src="./img/img_libro_rojo.png" alt="Imagen de libro">
        <input type="text" placeholder=" Nombre o Nick" id="inputNick">
        <input type="email" placeholder=" Correo Electronico" id="inputEmail">
        <p id="textoCorreoInvalido" class="textoCorreoInvalido">Escribe un correo valido</p>
        <input type="password" placeholder=" Contrase\xF1a" id="inputPassword">
        <button id="botonInicio">Registrarse</button>
        <hr style="width:100%;text-align:center">
        <button id="botonInicioGoogle"><img src="./img/btn_google_signin.png" alt="boton de google" class="imgButton"></button>
        <p class="textoCrearCuenta">\xBFTienes una cuenta? Ingresa
        <a id="botonAqui" href="#" onclick="console.log('hola mundo')"> aqu\xED!</a></p>
      </section>
    </main>
  `;
};
const timeline = () => {
  const root = document.getElementById("pantallaMostrada");
  root.innerHTML = `
  <div id="publicacion">
    <header class="cabecera">
      <div class="lateral"></div>
      <section class="miLogo">
        <img src="./img/img_libro_rojo.png" alt="imagen libro">
        <h1>LEEME</h1>
      </section>
      <img class="lateral" src="./img/imgPerfil.png" alt="imagen perfil">
    </header>
    <main class="mainPublicacion" id="miPublicacion">
      <button class="botonPublicacion" id="nuevaPublicacion">NUEVA PUBLICACION</button>
      <section id="publicaciones">
        <img src="./img/cargando.gif" alt="imagen cargando">
      </section>
    </main>
  </div>
  `;
};
const rutas = {
  "/": login,
  "/registro": registro,
  "/timeline": timeline,
  "/crear-publicacion": crearPublicacion
};
const onNavigate = (pathName) => {
  window.history.pushState(
    {},
    pathName,
    window.location.origin + pathName
  );
  rutas[pathName]();
  if (pathName === "/") {
    loginEventos(onNavigate);
  }
  if (pathName === "/registro") {
    registroEventos(onNavigate);
  }
  if (pathName === "/timeline") {
    timelineEventos(onNavigate);
  }
  if (pathName === "/crear-publicacion") {
    crearPublicacionEventos(onNavigate);
  }
};
onNavigate("/");
const style = "";
