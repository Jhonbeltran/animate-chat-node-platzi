'use strict'

//Este es el modulo que vamos a utilizar para hacer la comunicacion real time

const socketio = require('socket.io')

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
	}

}