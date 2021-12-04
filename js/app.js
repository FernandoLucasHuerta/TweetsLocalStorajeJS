const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let  tweets = [];



eventListeners();
function eventListeners() {
    //cuando el usuario agrega un tweet
    formulario.addEventListener('submit', agregarTweet)

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets)

        crearHTML();
    })
}

function agregarTweet(e) {
    e.preventDefault();
    
    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio')
        return; //evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }


    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]

    //una vez agregado crear HTML
    crearHTML();
    
    //reiniciar el formulario
    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    //insertar en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    //elimina la alerta
    setTimeout(() => {
        mensajeError.remove();
    }, 2000)
}

//muestra listado de los tweets
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
    
        tweets.forEach(tweet => {

                    //agregar un boton
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.textContent = 'X';

        //añadir la funcion de eliminar
        btnEliminar.onclick = () => {
            borrarTweet(tweet.id);
        }
            //crear Html
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet;

            //asignar boton
            li.appendChild(btnEliminar);

            //insertar en el html

            listaTweets.appendChild(li);
        })
    } 

    sincronizarStorage();
}

//agrega los tweet actuales al storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//elimina el tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

//limpiar  el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}