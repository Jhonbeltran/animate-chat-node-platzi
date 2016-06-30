'use strict'

/*Funcionalidad para limpiar y imagenes para poderlas borrar luego.
Este archivo va a a exportar una funcion que me permite listar un directorio(tempDir)
y entregar los archivos filtrados por el nombre base
*/

const fs = require('fs')


module.exports = function(folder, filter, callback) {
	//Primer argumento: folder donde vamos a buscar
	//Segundo argumento: inicio o base del archivo
	//Callback: para finalizar

	//Para leer el contenido de un directorio usamos:
	fs.readdir(folder, onReaddir)

	//Este callback va a entregar el error o la lista de archivos
	function onReaddir(err, results){
		if (err) return callback(err)

		let files = results.filter(filterFiles)

		//Le pasamos al callback el primer argumento nulo para cuando no ha ocurrido ningun error
		callback(null, files)
	}

	function filterFiles(file) {
		return file.startsWith(filter)
	}

}