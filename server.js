'use strict'

const http = require('http')
const port = process.env.PORT || 8080

//Esto lo escribimos para hacer uso del file system para poder hacer que el server responda
//Con archivos como un html
const fs = require('fs')

//Para que nuestro codigo funcione sin problemas en otros sistemas operativos
//En windows por ejemplo las direcciones son manejadas con \ y no con / 
//Vamos a usar el siguiente path

const path = require('path')


function onRequest(req, res) {
	let fileName = path.join(__dirname, 'public', 'index.html')

	/*Streams: Mecanismos para poder leer archivos o fuentes de informacion binaria,
	de forma inteligente, es decir una lectura mucho mas rapida, vamos a usar un stream de lectura
	y enviarlo a un stream de escritura*/

	//Creamos un rs = readstream a partir de fileSystem fs
	let rs = fs.createReadStream(fileName)

	//Seteamos el header
	res.setHeader('Content-Type', 'text/html')

	//req y res tambien son streams .___. 
	//De esta manera (la liena de abajo) ya estoy leyendo el archivo y lo estoy enviando
	//.pipe es una tuberia ._.
	rs.pipe(res)
	
	//Si hay errores los podemos controlar de la siguente forma

	rs.on('error', function (err) {
		//No necesitamos el return ._.
		res.end(err.message)
	})
	/* Los streams nos permiten manipular canales de informacion haciendo buffering inteligente
	sin necesidad de tener que cargar todo el bloque en memoria*/
}

function onListening(){
	console.log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢')
	/*console.log('El servidor ha iniciado y está escuchando en el puerto: ' + port)*/
	//Para hacer que se comporte como un template vamos a usar en vez de ' usamos backtick `
	console.log(`El servidor ha iniciado y está escuchando en el puerto: ${port}`)
}

const server = http.createServer()
server.listen(port)

//Acá estan los evenemiters request, listening...
server.on('request', onRequest)
server.on('listening', onListening)


