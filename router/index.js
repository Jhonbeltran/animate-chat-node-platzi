//Llamo el modulo st
const st = require('st')

//Uso el modulo path para hacer uso de las rutas
const path = require('path')

//Creo la configuracion del modulo

const mount = st ({
	path: path.join(__dirname, '..', 'public'),
	index: 'index.html'
})

function onRequest(req, res) {
	mount(req, res, function (err) {
		if (err) return res.emd(err, message)
		//Else
		res.statusCode = 404
		res.end('Not found '+req.url)
	})
}

//Esta es la forma de exportar una funcion a otro que va a hacer el llamado
module.exports = onRequest