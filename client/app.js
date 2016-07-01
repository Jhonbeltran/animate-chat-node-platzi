//Referenciamos el modulo xhr que nos va ayudar con el ajax, diseñado para usarse con browserify
const xhr = require('xhr')

//Requerimos domify para poder mostrar el mensaje
const domify = require('domify')

//Esto es una clase
const Webrtc2Images = require('webrtc2images')

//Requerimos el template de mensaje
const messageTpl = require('./templates/message.hbs')

//Instanciamos un objeto de la clase Webrtc2Images
const rtc = new Webrtc2Images({
  width: 200,
  height: 200,
  frames: 10,
  type: 'image/jpeg',
  quality: 0.4,
  interval: 200
})

rtc.startVideo(function (err) {
  if (err) return logError(err)
})

//Este será el contenedor para guardar los mensajes
const messages = document.querySelector('#messages')
const form = document.querySelector('form')

//Le damos un evento al formulario y ejecutamos la funcion con el evento
form.addEventListener('submit', function (e) {
  e.preventDefault()
  //Justo acá empieza a grabar
  record()

}, false)


//Ahora tenemos la logica del boton record dentro de una funcion

//GRABAMOS EL VIDEO
function record () {
  //Vamos a capturar el mensaje para poderlo mostrar en pantalla
  const input = document.querySelector('input[name="message"]')
  const message = input.value
  input.value = ""

  //Llamamos la funcionalidad del modulo rtc que nos permite grabar
  rtc.recordVideo(function (err, frames) {
    //Los frames estan almacenados en un arreglo
    //Vamos a crear el codigo que nos permite enviar desde el cliente hacia el servidor
    if (err) return logError(err)

    //Definimos la ruta del lado del cliente
    //(Desde el lado del cliente, hacia el servidor)

    //ENVIAMOS LAS IMAGENES AL SERVIDOR
    xhr({
      uri: '/process',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: frames }),
    }, function (err, res, body) {
      if (err) return logError(err)

      //EL SERVIDOR NOS RETORNA EL VIDEO
      body = JSON.parse(body)

      //Y CUANDO YA TENEMOS EL VIDEO AGREGAMOS EL MENSAJE EN EL CHAT
      if (body.video) {
        //Creamos una nueva funcion para enviar un video por cada mensaje
        addMessage({ message: message, video: body.video })
      }
    })

  })
}

function addMessage (message) {
  const m = messageTpl(message)
  messages.appendChild(domify(m))
  window.scrollTo(0, document.body.scrollHeight)
}

function logError (err) {
  console.error(err)
}