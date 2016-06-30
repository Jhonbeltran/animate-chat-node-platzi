'use strict'

//Creacion de un eventEmitter
const EventEmitter = require('events').EventEmitter

//Declaramos el modulo de neo-async
const async = require('neo-async')

//Requerimos data-uri-to-buffer para hacer la conversion de imagenes
const dataURIBuffer= require('data-uri-to-buffer')

//Vamos a exportar una funcion
module.exports= function(images) {
	//Generamos un gestor de eventos
	let events = new EventEmitter()

	//Vamos a definir el workflow inicial de lo que vamos a trabajar
	async.series([
		decodeImages,
		createVideo,
		encodeVideo,
		cleanup
	], convertFinished)

	//Debo decodificar las imagenes de base64(Data uri) a buffer(formato binario)
	function decodeImages(done) {
		//Recordemos que las imagenes son un array
		//procesaremos cada una de las imagenes por separado (operacion asincrona)
		//Usamos .eachSeries para asegurar el orden de las imagenes
		//El primer argumento que recibe es un arreglo, despues un callback
		async.eachSeries(images, decodeImage, done)
		done()
	}

	function decodeImage(image, done) {
		// Vamos a convertir la imagen a buffer 
		//y la vamos a guardar en el sistema de archivos con un nombre (unico)

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