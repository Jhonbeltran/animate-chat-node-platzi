//Llamo el modulo st
const st = require('st')
//Agrego course para el manejo de rutas dinamicas
const course = require('course')


const router = course()

//Uso el modulo path para hacer uso de las rutas
const path = require('path')

//Creo la configuracion del modulo

const mount = st ({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html',
	/*si no hay un archivo en el servidor estatico, continue la ejecucion
	para que no lance directamente un 404 pues posiblemente yo quiero que la logica siga*/
	passtrough: true
})


//Voy a definir la ruta que me va a recibir el objeto que yo voy a enviar desde el cliente
router.post('/process', function(req, res) {
	//Los req y res en course son http basicos no como los de express que son modificados
	/*Voy a trabajar con un modulo que nos va ayudar con lo de ajax (modulo xhr
	El cual es una abstracción muy basica de ajax de js)*/
})

function onRequest(req, res) {
	mount(req, res, function (err) {
		if (err) return res.emd(err, message)
		
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