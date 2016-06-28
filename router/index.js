'use strict'

//Llamo el modulo st
const st = require('st')
//Agrego course para el manejo de rutas dinamicas
const course = require('course')
//Requiero jsonbody
const jsonBody = require('body/json')

const router = course()

//Uso el modulo path para hacer uso de las rutas
const path = require('path')

//Creo la configuracion del modulo

const mount = st ({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	passtrough: true
})


//Voy a definir la ruta que me va a recibir el objeto que yo voy a enviar desde el cliente
router.post('/process', function(req, res) {
	jsonBody(req, res, {limit: 3 * 1024 * 1024 }, function(err, body) {
		if(err) return fail(err, res)

		console.log(body)

		//Enviamos una respuesta
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify({ok:true}))
	})
})

function onRequest(req, res) {
	mount(req, res, function (err) {
		if (err) return fail(err, res)
		
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