//Obtenemos el cliente de socket.io
const io = require('socket.io-client')

//Modulo de uuid
const uuid = require('uuid')

//Requerimos domify para poder mostrar el mensaje
const domify = require('domify')

//Esto es una clase
const Webrtc2Images = require('webrtc2images')

//Requerimos el template de mensaje
const messageTpl = require('./templates/message.hbs')

//Obtenemos el socket de la conexion
//El socket va a permitirme conectarme con el servidor
const socket = io.connect()

//Vamos a definir nuestro id para diferenciar los mensajes de los demas y el mio
const id = uuid.v4()

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


//Cuando yo reciba un mensaje del servidor
socket.on('message', addMessage)

//Para poder ver mi propio mensaje
socket.io('message', function(message) {
  if(message.id == id){
    addMessage(message)
  }
})

//GRABAMOS EL VIDEO
function record () {
  //Vamos a capturar el mensaje para poderlo mostrar en pantalla
  const input = document.querySelector('input[name="message"]')
  const message = input.value
  input.value = ""

  //Llamamos la funcionalidad del modulo rtc que nos permite grabar
  rtc.recordVideo(function (err, frames) {
    //Los frames estan almacenados en un arreglo
    if (err) return logError(err)
      //Despues de grabar el video vamos a emitir un evento
      socket.emit('message', { id: id, message: message, frames: frames})
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