'use strict'

//Creacion de un eventEmitter
const EventEmitter = require('events').EventEmitter

//Declaramos el modulo de neo-async
const async = require('neo-async')

//Requerimos data-uri-to-buffer para hacer la conversion de imagenes
const dataURIBuffer= require('data-uri-to-buffer')

//Requerimos uuid para que nos ayude con la generacion de nombres de imagenes unicos
const uuid = require('uuid')

//Requerimos un modulo del core de node para acceder a algunas funcionalidades deo os
const os = require('os')
const fs = require('fs')
const path = require('path')

//Llamamos la funcion de lista
const listFiles = require('./list')

//llamamos la funcion de ffmpeg
const ffmpeg = require('./ffmpeg')

//Requerimos la funcion concat-stream 
//Nos sirve para agarrar todo un stream y meterlo en un solo buffer
const concat = require('concat-stream')


//Vamos a exportar una funcion
module.exports= function(images) {
	//Generamos un gestor de eventos
	let events = new EventEmitter()

	//Contador de las imagenes que vamos a estar trasnformando
	let count = 0

	//El nombre que vemos a generar con el uuid
	let baseName = uuid.v4()

	//Directorio temporal de imagenes
	let tmpDir = os.tmpDir()

	//Variable que va a contener el video final
	let video

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
		
	}

	function decodeImage(image, done) {
		// Vamos a convertir la imagen a buffer 
		//y la vamos a guardar en el sistema de archivos con un nombre (unico)
		//para fileName usamos template strings (será un nombre dinamico)
		let fileName = `${baseName}-${count++}.jpg`

		let buffer = dataURIBuffer(image)
		//Usaremos un stream de escritura
		let ws = fs.createWriteStream(path.join(tmpDir, fileName))

		/*Como el eventemitter pasa como primer argumento el error,
		 el callback va a ver como primer argumento un error,
		 asi que va a romper la cadena de ejecucion, 
		 de esta manera con streams vamos a poder parar la cadena de llamado asincrono*/
		 /*Terminamos el stream pasandole el buffer y cuando termine de pasar el buffer,
		vamos a ejecutar el metodo done*/
		ws.on('error', done)
      	.end(buffer, done)

		events.emit('log', `Converting ${fileName}`)


	}
	
	//Creamos el video con las imagenes
	function createVideo(done) {
		events.emit('log', 'Creating video')
		ffmpeg({
			baseName: baseName,
			folder: tmpDir
		}, done)
	}
	
	//Codifico el video al formato de la web
	function encodeVideo(done) {
		let fileName = `${baseName}.webm`
		let rs = fs.createReadStream(path.join(tmpDir, fileName))

		events.emit('log', `Encoding video ${fileName}`)

		rs.pipe(concat(function(videoBuffer) {
			video = `data:video/webm;base64,${videoBuffer.toString('base64')}`
			done()
		}))
		
		rs.on('error', done)
	}
	
	//Limpieza de archivos temporales
	function cleanup(done) {
		events.emit('log', 'Cleaning up')

		//Este metodo viene de list.js
		listFiles(tmpDir, baseName, function(err, files) {
			if (err) return done(err)

			//Con esta funcion nombrada vamos a borrar las imagenes
			deleteFiles(files, done)

		})
	}

	function deleteFiles(files, done) {
		async.each(files, deleteFile, done)
	}

	function deleteFile(file, done){
		events.emit('log', `Deleting ${file}`)

		//Usamos .unlink para borrar un archivo
		fs.unlink(path.join(tmpDir, file), function(err) {
			//Ignoramos el error, pues no es importante

			done()
		})
	}

	//La ultima, como es el callback final, solamente va a recibir el error.
	function convertFinished(err){
		if(err) return events.emit('error', err)
		//Else
		events.emit('video', video)

	}


	

	return events
}