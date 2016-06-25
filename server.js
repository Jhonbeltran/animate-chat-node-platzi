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
	let direccion = req.url

	if (direccion.startsWith('/index') || direccion == '/') return serveIndex(res)

	if (direccion == '/app.js') return serveApp(res)
	
	res.statusCode = 404
	res.end("4040 not found"+direccion)
}

//Esta funcion me va a cargar el archivo index.html
function serveIndex(res) {
	let index = path.join(__dirname, 'public', 'index.html')
	let rs = fs.createReadStream(index)
	res.setHeader('Content-Type', 'text/html')
	rs.pipe(res)
	
	rs.on('error', function (err) {
		res.setHeader('Content-Type', 'text/plain')
		res.end(err.message)
	})

}

//Esta funcion me va a cargar el archico app.js
function serveApp(res) {
	let app = path.join(__dirname, 'public', 'app.js')
	let rs = fs.createReadStream(app)
	res.setHeader('Content-Type', 'text/javascript')
	rs.pipe(res)
	
	rs.on('error', function (err) {
		res.setHeader('Content-Type', 'text/plain')
		res.end(err.message)
	})

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


