'use strict'

const http = require('http')
const port = process.env.PORT || 8080
const fs = require('fs')

const realtime = require('./realtime')


const server = http.createServer()

//Con esto estamos trayendo la funcion onRequest de index.js en la carpeta router
const router = require('./router')

realtime(server)
//Y con esto ya podemos ver en consola
//Client connected /#fYsz2U4H6zIwwxnhAAAA


server.on('request', router)
server.on('listening', onListening)

server.listen(port)

function onListening(){
	console.log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢')
	console.log(`El servidor ha iniciado y está escuchando en el puerto: ${port}`)
}