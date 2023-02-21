import { routes } from "./routes";

export const onNavigate = (pathname) =>{
  //para escribir en la ruta de navegacion
  //segun el video
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  //para pintar segun ruta
  pintar(window.location.pathname)
}

function pintar(pathname){
  //pintamos la pantalla segun la ruta
  const root = document.getElementById("root")  
  root.innerHTML = routes[window.location.pathname]();
  //para añadir eventos segun pantalla
  if(pathname=='/'){ 
    const botonRegistrar = document.getElementById("botonRegistrar")
    botonRegistrar.addEventListener("click",()=>{
      onNavigate('/register')
    })
  }
  else if(pathname=='/register'){ 
    const botonRegistrar = document.getElementById("botonInicio")
    botonRegistrar.addEventListener("click",()=>{
      onNavigate('/principal')
    })
  }
}

pintar(window.location.pathname)