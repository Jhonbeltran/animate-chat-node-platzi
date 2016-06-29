'use strict'

//Creacion de un eventEmitter
const EventEmitter = require('events').EventEmitter

//Declaramos el modulo de neo-async
const async = require('neo-async')

//Vamos a exportar una funcion
module.exports= function(images) {
	//Generamos un gestor de eventos
	let events = new EventEmitter()

	//Vamos a definir el workflow inicial de lo que vamos a trabajar

	//Debo decodificar las imagenes de base64(Data uri) a buffer(formato binario)
	//Buffer me permite pasar facilmente las imagenes al sistema de archivos y almacenarlas
	//como jpeg

	function decodeImages() {}
	
	//Creamos el video con las imagenes
	function createVideo() {}
	
	//Codifico el video al formato de la web
	function encodeVideo() {}
	
	//Limpieza de archivos temporales
	function cleanup() {}

	function convertFinished(){}


	setTimeout(function(){
		//De esta forma emitimos el evento
		events.emit('video', 'this will be the encoded video')
	}, 5000)

	return events
}