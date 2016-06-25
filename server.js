'use strict'

const http = require('http')
const port = process.env.PORT || 8080

//Esto lo escribimos para hacer uso del file system para poder hacer que el server responda
//Con archivos como un html
const fs = require('fs')


function onRequest(req, res) {
	//Esto de abajo usa un metodo sincrono(esto no es recomendado)
	let file = fs.readFileSync('public/index.html')
	res.end(file)
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


