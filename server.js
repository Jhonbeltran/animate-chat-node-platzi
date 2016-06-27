'use strict'

const http = require('http')
const port = process.env.PORT || 8080
const fs = require('fs')

const server = http.createServer()

//Con esto estamos trayendo la funcion onRequest de index.js en la carpeta router
const router = require('./router')

server.on('request', router)
server.on('listening', onListening)

server.listen(port)

function onListening(){
	console.log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢')
	console.log(`El servidor ha iniciado y está escuchando en el puerto: ${port}`)
}



//Browserify me permite convertir archivos escritos como node a el browser

//Va a ser usada en desarrollo nada mas $ npm install --save-dev browserify 






