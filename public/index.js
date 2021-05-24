
mostrarlista()

let librosLocal={}

function mostrarlista(){
fetch("/api/libros").then(res => res.jason()).then(function(respuesta){//esto recapitula los datos, siguiente paso¿Qué hacemos con ellos?
    if(respuesta.error){
    document.getElementById("feedback").innerHTML =`<p>Hemos tenido un error</p>`

    }else{
        imprimir(respuesta)
    }
    })
}
function busca(){
    fetch(`/api/libros/${document.getElementById('busca').value}`)
    .then((res) => res.json())
    .then(function(respuesta){//esto recapitula los datos, siguiente paso¿Qué hacemos con ellos?
        if(respuesta.error){
        document.getElementById("feedback").innerHTML =`<p>Hemos tenido un error</p>`
    
        }else{
            imprimir(respuesta)
    }
        })
    }


function enviarInfo() {//a esta funcion llamamos cuando le damos al boton
    
fetch(`/api/nuevoLibro/${document.getElementById('EstadoModificar').value}`, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
    },
})

.then((res) => res.json())
.then(function(respuesta){
    respuesta.error
    ? document.getElementById("feedback").innerHTML =`<p>Error durante guardado</p>`

    : document.getElementById("feedback").innerHTML =`<p>Libro correctamente guardado</p>`
    mostrarLista()
})
}

function modificarInfo() {
    fetch(`/api/editarLibro/${librosLocal[i].titulo}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
    })
    
    .then((res) => res.json())
    .then(function(respuesta){
        if(respuesta.error){
            document.getElementById("feedback").innerHTML =`<p>Error durante guardado</p>`
        }else{
            respuesta.contenido.results.nModified > 0
            ? document.getElementById("feedback").innerHTML =`<p>Libro marcado como leido</p>`

            : document.getElementById("feedback").innerHTML =`<p>Libro no encontrado</p>`
            mostrarLista()
        }
    })
    }

function EliminarLibro() {//a esta funcion llamamos cuando le damos al boton

fetch(`/api/borrar/${librosLocal[i].titulo}`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json"
    },
})

.then((res) => res.json())
.then(function(respuesta){
    if(respuesta.error){
        document.getElementById("feedback").innerHTML =`<p>Error durante guardado</p>`
    }else{
        respuesta.contenido.deletedCount > 0
        ? document.getElementById("feedback").innerHTML =`<p>Libro borrado</p>`

        : document.getElementById("feedback").innerHTML =`<p>Libro no encontrado</p>`
        mostrarLista()
    }
})

}

function imprimir(respuesta) {
    librosLocal = respuesta.contenido;
    let parrafo = "";
    for (let i = 0; i < respuesta.contenido.length; i++) {
      parrafo += `<tr><td>${respuesta.contenido[i].titulo}</td><td>${
        respuesta.contenido[i].estado ? "leído" : "sin leer"
      }</td><td><button onclick="modificarInfo(${i})">Leido</button></td><td><button onclick="EliminarLibro(${i})">Borrar</button></td></tr>`;
    }
    
    document.getElementById(
      "libros"
    ).innerHTML = `<table><th>Título:</th><th>Estado:</th>${parrafo}</table>`;
  }