'use strict'

//Requerimos level como nuestra base de datos
const level = require('level')
const uuid = require('uuid')


module.exports = function(options){
	//Si no llega nada  a la funcion vamos a crear unas opciones vacias
	options = options || {}

	//Indicamos el archivo en el que se va a almacenar la base de datos
	const db = level('./messages.db')

	//Esta funcion va a guardar nuestro mensaje
	function save(message, callback) {
		//Generamos un key unico para cada mensaje
		//Para el key unico necesitamos el prefijo mensaje que nos va a ayudar en la busqueda
		//El timestamp de la fecha
		//Y el codigo unico generado por uuid
		let key = `message-${Date.now()}-${uuid.v4()}`

		//le indicamos dentro de las opciones el encoding 
		let options = {
			valueEncoding: 'json'
		}

		//guardamos el mensaje en la base de datos
		db.put(key, message, options, callback)
	}

	//Listar el mensaje
	function list(callback) {
		callback()
	}

	return{
		save: save,
		list: list
	}
}