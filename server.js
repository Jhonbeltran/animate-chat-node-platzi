'use strict'

const http = require('http')
const port = process.env.PORT || 8080

//Esto lo escribimos para hacer uso del file system para poder hacer que el server responda
//Con archivos como un html
const fs = require('fs')


function onRequest(req, res) {
	//Ahora lo correcto es trabajar con funcionalidades asincronas :)
	//El ultimo elemento de una funcion asincrona es un callback
	//En este caso la funcion dentro del readFile va a recibir el archivo despues de que lo cargue

	//Vamos a usar un callback muy comun en node "El error como primer argumento"
	fs.readFile('public/index.html', function(err, file){
		if (err){
			//Asi manejamos el error 
			return res.end(err.message)
		}
		res.end(file)
	})
}
function onListening(){
	console.log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢')
	console.log('El servidor ha iniciado y está escuchando en el puerto: ' + port)
}

const server = http.createServer()
server.listen(port)

//Acá estan los evenemiters request, listening...
server.on('request', onRequest)
server.on('listening', onListening)


