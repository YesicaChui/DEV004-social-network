// importo la configuracion de firebase del archivo de barril
import Firebase from '../firebaseConfig.js';
// pongo los nombres usuales de los objetos y funciones de firebase
const { db, auth, addDoc, getDocs, doc, collection, deleteDoc } = Firebase;
export const firebaseCrearPublicacion = async (texto) => {
  // insertando la publicacion en la coleccion Publicaciones con el documento publicacion
  await addDoc(collection(db, 'Publicaciones'), { publicacion: texto });
  console.log('dato insertado');
};

export const firebaseLeerPublicacion = async () => {
  // con el await decimos que esperemos que termine la funcion getDocs antes de continuar
  // leemos todos los documentos de la coleccion Publicaciones
  const querySnapshot = await getDocs(collection(db, 'Publicaciones'));

  // iniciamos el template String
  let HtmlString = '';
  // recorremos todos los documentos de las publicaciones
  for(let i=0; i<querySnapshot.docs.length; i++){
    // guardamos cada publicacion en document
    const document=querySnapshot.docs[i];
    // seleccionamos la sub coleccion likes
    const likesRef = collection(doc(db, "Publicaciones", document.id), "likes");
    // leemos los likes de la publicacion
    const likesDePublicacion = await getDocs(likesRef);
    let tieneLike=false
    // busco si estoy entre los usuarios que dieron like a la publicacion
    // si estoy cambio el valor de tieneLike a true
    likesDePublicacion.forEach((documentLike) => {
      if(documentLike.data().email===auth.currentUser.email) tieneLike=true
    });
    // si di like se pintara el img con un like pintado sino estara vacio segun la variable tieneLike
    HtmlString += `
      <article class='miPublicacion'>
        <div class="likes">
          <span>${likesDePublicacion.docs.length}</span>
          <img class="botonLike" id=${document.id} src=${tieneLike?"./img/likeLleno.png":"./img/likeVacio.png"} alt="">
        </div>
        <p>${document.data().publicacion}</p>        
      </article>
    `;
  };
  return HtmlString;
};

export const firebaseDarLike = async (id) => {
  // guardo el usuario actual autenticado en user
  const user=auth.currentUser
  // inserto la sub coleccion likes con mi correo
  await addDoc(collection(doc(db, "Publicaciones", id), "likes"), {
    email: user.email,
  });
};

export const firebaseQuitarLike = async (id) => {
  // obtengo los documentos de la sub coleccion likes de una publicacion
  const querySnapshot = await getDocs(collection(db, "Publicaciones", id, "likes"));
  // busco mi email en la sub coleccion likes y lo elimino
  querySnapshot.forEach((doc) => {
    if (doc.data().email === auth.currentUser.email) {
      deleteDoc(doc.ref);
    }
  });
};
