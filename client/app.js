//Esto es una clase
const Webrtc2Images = require('webrtc2images')
//Referenciamos el modulo xhr
const xhr = require('xhr') 


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

	//grabar
	rtc.recordVideo(function(err, frames){
		//Los frames estan almacenados en un arreglo
		//Vamos a crear el codigo que nos permite enviar desde el cliente hacia el servidor
		if (err) return logError(err)

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