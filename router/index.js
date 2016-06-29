'use strict'

//Llamo el modulo st
const st = require('st')
//Agrego course para el manejo de rutas dinamicas
const course = require('course')
//Requiero jsonbody(de body, Body parsing)
const jsonBody = require('body/json')

//Vamos a requerir el helper 
//Usamos los dos puntos porque está un directorio mas arriba
//Cuando requerimos un directorio el nos va a buscar el archivo index
const helper = require('../helper')



//Course me genera una funcion que me permite crear un enrrutador (router)
const router = course()

//Uso el modulo path para hacer uso de las rutas
const path = require('path')

//Creo la configuracion del modulo

const mount = st ({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	/*Si no hay un archivo en el server estatico, continue la ejecucion*/
	passtrough: true
})


//Voy a definir la ruta que me va a recibir el objeto que yo voy a enviar desde el cliente
router.post('/process', function(req, res) {
	//Modificamos la peticion que llega, de la siguiente forma
	//El limit por defecto es de 1mb, nosotros necesitamos 3mb
	jsonBody(req, res, {limit: 3 * 1024 * 1024 }, function(err, body) {
		if(err) return fail(err, res)

		//Verificamos si nos estan llegando imagenes al servidor
		if(Array.isArray(body.images)){

		//Vamos a empezar a trabajar con el helper
		//Llamamos a la funcion .convertVideo que está en helper/index.js
		let converter = helper.convertVideo(body.images)

		//Asi trabajamos con el event emitter
		//Se va a ejecutar cada vez que se emita el evento video
		converter.on('video', function(video) {
			res.setHeader('Content-Type', 'application/json')
			//De esta manera envia el video, que por ahora es solo una cadena de caracteres
			res.end(JSON.stringify({video: video}))
		})

		}else{
			res.statusCode = 500
			res.end(JSON.stringify({ error: 'parameter `images` is required' }))
		}
	})
})

function onRequest(req, res) {
	//Servidor estatico
	mount(req, res, function (err) {
		if (err) return fail(err, res)
		
		//Rutas dinamicas
		router(req, res, function(err) {
			if(err)return fail(err, res)

			//Else
			res.statusCode = 404
			res.end('Not found '+req.url)
		})

		
	})
}

//Hacemos un modulo fail para responder a errores 500 o errores de servidor
function fail(err, res) {
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain')
	res.end(err, message)
}

//Esta es la forma de exportar una funcion a otro que va a hacer el llamado
module.exports = onRequest