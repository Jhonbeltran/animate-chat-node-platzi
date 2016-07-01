//--enable-libvpx nos va a ayudar a convertir las imagenes al formato de video del navegador
//En este archivo vamos a empaquetar el ffmpeg
'use strict'

/*'child_process' : es un modulo del core de node que me permite ejecutar comandos
o ejecutar otros archivos js dentro del proceso principal de node, voy a poder ejecutar:
- comandos del sistema (libreria en node, actividades en servidor, ejecutar scripts)
nos ayuda a empaquetar comandos. Este comando nos entrega tres funciones:*/

/*1. exec ejecuta el comando y hace buffer de la salida del comando, cuando el comando
 termina me envia todo el buffer a quien esta llamando el archivo*/
//2. fork ejecuta un proceso js o node de la misma manera

//3. spawn Ejecuta el comando y nos entrega los streams de salida y error del comando
const spawn = require('child_process').spawn

const os = require('os')
const path = require('path')

//A esta funcion le vamos a pasar un objeto y un callback
module.exports = function (options, callback){
	//Este comando me va a convertir las imagenes a video

	//De esta manera definimos un parametro obligatorio en una funcion
	if(!options.baseName) return callback(new TypeError('You must specify a baseName'))

	//Definimos el folder donde vamos a tener los archivos
	let folder = options.folder || os.tmpDir()

	//Nombre base
	let baseName = options.baseName

	//Definimos los archivos fuentes
	let fileSrc = path.join(folder, `${baseName}-%d.jpg`)

	//Archivo de destino (en formato de video!)
	let fileDest = path.join(folder, `${baseName}.webm`)

	/*ffmpeg es un una libreria o utilidad que permite trabajar con formatos de video y con
	codificaciones permite trabajar tambien con audio y es multiplataforma*/

	// $ ffmpeg -i images-%d.jpg -filter:v "setpts=2.5*PTS" -vcodec libvpx -an video.webm


	//De esta manera empaqueto el comando para ejecutarlo desde node
	let ffmpeg = spawn('ffmpeg', [
		'-i',
		fileSrc,
		'-filter:v',
		'setpts=2.5*PTS',
		'-vcodec',
		'libvpx',
		'-an',
		fileDest
	])

	//Con este comando podemos ver el output del comando anterior
	ffmpeg.stdout.on('close', function(code){
	//En sistemas operativos cuando un comando termina bien genera internamente un output
	//Si es 0 ha terminado bien, si es diferente de 0 significa que no
		if(!code) return callback(null)
		//Else
		callback(new Error(`ffmpeg exited with code ${code}`))
	})
}