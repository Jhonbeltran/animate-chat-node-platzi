'use strict'

//Creacion de un eventEmitter
const EventEmitter = require('events').EventEmitter

//Vamos a exportar una funcion
module.exports= function(images) {
	//Generamos un gestor de eventos
	let events = new EventEmitter()

	//Vamos a simular una operación asincrona
	//Despues de un segundo vamos a emitir un evento

	setTimeout(function(){
		//De esta forma emitimos el evento
		events.emit('video', 'this will be the encoded video')
	}, 5000)

	return events
}