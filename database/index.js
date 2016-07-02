'use strict'

module.exports = function(options){
	//Si no llega nada  a la funcion vamos a crear unas opciones vacias
	options = options || {}

	//Esta funcion va a guardar nuestro mensaje
	function save(message, callback) {
		callback()
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