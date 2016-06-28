//Esto es una clase
const Webrtc2Images = require('webrtc2images')

const rtc = new Webrtc2Images({
	with: 200,
	heigth: 200,
	frame: 10,
	type: 'image/jpeg',
	quality: 0.4,
	interval: 200
})

rtc.startVideo(function(err) {

})

const record = document.querySelector('#record')


record.addEventListener('click', function(e) {
	//Con esto vamos a prevenir el funcionamiento por defecto del boton
	e.preventDefault()

	//grabar
	rtc.recordVideo(function(err, frames){
		console.log(frames)
	})

}, false)


//Vamos a usar browserify para que lo escrito en node pueda verse como js en el browser

/*Usaremos course(que es muy similar a express), course nos va a ayudar con la creacion de las 
rutas course tambien hace parte de los modulos o librerias que se conectan con las librerias 
core que me permiten resolver problemas especificos*/