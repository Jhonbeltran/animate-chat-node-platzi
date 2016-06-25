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
	//Ahora lo correcto es trabajar con funcionalidades asincronas :)
	//El ultimo elemento de una funcion asincrona es un callback
	//En este caso la funcion dentro del readFile va a recibir el archivo despues de que lo cargue

	//Vamos a usar un callback muy comun en node "El error como primer argumento"

	//Recordemos que el let es usado en vez de var para definir variables con un scope seguro
	//Para que la variable solo exista dentro de su hambito y no pueda ser usada fuera de el.
	//let para variables, const para constantes

	let fileName = path.join(__dirname, 'public', 'index.html')

	fs.readFile(fileName, function(err, file){
		if (err){
			//Asi manejamos el error 
			return res.end(err.message)
		}
		//Le indico al navegador que tipo de archivo es, aunque el normalmente ya entiende
		res.setHeader('Content-Type', 'text/html')
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


