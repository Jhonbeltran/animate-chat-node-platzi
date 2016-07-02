'use strict'

//Este es el modulo que vamos a utilizar para hacer la comunicacion real time
const socketio = require('socket.io')

//Requerimos la funcionalidad del conversor de video
const helper = require('../helper')

//socket.io necesita una instancia de server para funcionar con un servidor http basico
module.exports = function(server) {
	//Le pasamos la instancia del servidor
	const io = socketio(server)



	//socket.io trabaja con un patron de eventemitter

	//connection (cuando un cliente se conecta a servidor se va a ejecutar una funcion)
	/*Dicha funcion va a tener el parametro socket con el cual nosotros vamos a hacer
	 la conexion en tiempo real con los diferentes clientes*/

	io.on('connection', onConnection)

	function onConnection(socket){
		console.log(`Client connected ${socket.id}`)

		//Cuando alguien se conecta vamos a recibir un mensaje
		socket.on('message', function(message){

			//cuando nos llega un mensaje primero hacemos la conversion del video
			const converter = helper.convertVideo(message.frames)

			//Para seguir imprimiendo los mensajes que me estan llegando
			converter.on('log', console.log)

			//Este evento me va a entregar el video procesado
			converter.on('video', function(video){
				delete message.frames
				message.video = video

				//Para envirarselo a todos lo enviamos a traves de un broadcast
				//broadcast(mensaje a todos los que estan conectados)
				socket.broadcast.emit('message', message)

				//Para poder ver mi propio video
				socket.emit('messageack', message)
			})
		})
	}
}