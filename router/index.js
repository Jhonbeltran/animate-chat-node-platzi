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

//Hemos eliminado la funcionalidad ajax de nuestra aplicacion
//Vamos a hacerlo todo en tiempo real!


function onRequest(req, res) {

	//Para no tener conflictos con socket.io
	if (req.url.startsWith('/socket.io')) return  

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