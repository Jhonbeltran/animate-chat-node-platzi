'use strict'

//Requerimos level como nuestra base de datos
const level = require('level')
//Con este "Plugin" convierto mi db persistente en una base de datos temporal
const ttl = require('level-ttl')
const uuid = require('uuid')
const concat = require('concat-stream')


module.exports = function(options){
	//Si no llega nada  a la funcion vamos a crear unas opciones vacias
	options = options || {}
	/*Definimos que la duracion del mensaje va a ser pasada por el objeto, o que
	va a ser de 10 min*/
	let duration = options.duration || 10 * 60 * 1000
	let limit = options.limit || 10
	//Indicamos el archivo en el que se va a almacenar la base de datos
	//El checkFrequency lo vamos a usar para que se verifique si hay archivos para borrar
	const db = ttl(level('./messages.db'), {checkFrequency: 10000})

	//Esta funcion va a guardar nuestro mensaje
	function save(message, callback) {
		//Generamos un key unico para cada mensaje
		//Para el key unico necesitamos el prefijo mensaje que nos va a ayudar en la busqueda
		//El timestamp de la fecha
		//Y el codigo unico generado por uuid
		let key = `message-${Date.now()}-${uuid.v4()}`

		//le indicamos dentro de las opciones el encoding 
		let options = {
			valueEncoding: 'json',
			ttl: duration
		}

		//guardamos el mensaje en la base de datos
		db.put(key, message, options, callback)
	}

	//Listar el mensaje
	function list (callback) {
    let rs = db.createValueStream({
      limit: limit,
      valueEncoding: 'json',
      reverse: true,
      gt: 'message'
    })

    rs.pipe(concat(function (messages) {
      callback(null, messages.reverse())
    }))

    rs.on('error', callback)
  }

	return{
		save: save,
		list: list
	}
}