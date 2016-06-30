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
	/*Con series definimos cuales son las funciones que se van a ejecutar(de manera secuencial),
	la ultima funcion convertFinished la usamos a modo de callback*/
	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanup
	], convertFinished)

	//Debo decodificar las imagenes de base64(Data uri) a buffer(formato binario)
	//Buffer me permite pasar facilmente las imagenes al sistema de archivos y almacenarlas
	//como jpeg
	function decodeImages(done) {
		//Done es un callback el cual continua la ejecucion a la siguiente funcion
		done()
	}
	
	//Creamos el video con las imagenes
	function createVideo(done) {
		done()
	}
	
	//Codifico el video al formato de la web
	function encodeVideo(done) {
		done()
	}
	
	//Limpieza de archivos temporales
	function cleanup(done) {
		done()
	}

	//La ultima, como es el callback final, solamente va a recibir el error.
	function convertFinished(err){
		setTimeout(function(){
		//De esta forma emitimos el evento
		events.emit('video', 'this will be the encoded video')
		}, 5000)
	}


	

	return events
}