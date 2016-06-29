//Referenciamos el modulo xhr que nos va ayudar con el ajax, diseñado para usarse con browserify
const xhr = require('xhr') 

//Esto es una clase
const Webrtc2Images = require('webrtc2images')
//Instanciamos un objeto de la clase Webrtc2Images
const rtc = new Webrtc2Images({
	with: 200,
	heigth: 200,
	frame: 10,
	type: 'image/jpeg',
	quality: 0.4,
	interval: 200
})


rtc.startVideo(function(err) {
	if (err) return logError(err)
})

const record = document.querySelector('#record')


record.addEventListener('click', function(e) {
	//Con esto vamos a prevenir el funcionamiento por defecto del boton
	e.preventDefault()

	//Llamamos la funcionalidad del modulo rtc que nos permite grabar
	rtc.recordVideo(function(err, frames){
		//Los frames estan almacenados en un arreglo
		//Vamos a crear el codigo que nos permite enviar desde el cliente hacia el servidor
		if (err) return logError(err)

		//Definimos la ruta del lado del cliente
		//(Desde el lado del cliente, hacia el servidor)
		xhr({
			uri: '/process',
			method: 'post',
			header: {'Content-Type':'application/json'},
			body: JSON.stringify({ images: frames})

		}, function(err, res, body){

			if (err) return logError(err)

			console.log(JSON.parse(body))

		})

	})

}, false)

function logError (err) {
  console.error(err)
}

//Para convertir este archivo de manera node a un js que pueda entender el navegador usamos:
//$ browserify client/app.js -o public/app.js
//O usamos desde npm el comando que definimos como  $ npm run build-js