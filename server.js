//Con esto puedo evitar algunas malas practivas en js 
//Errores relacionados con this ademas de poder usar let y const para tener un scope correcto
'use strict'

//Defino como const = constantes y let = variables
//usamos const en este caso pues de seamos que los modulos que vamos a usar no cambien.

//El modulo http me permite crear un servidor web o http con io.js/node.js
const http = require('http')
//Recordemos que en javascript las comillas son opcionales, al igual que la las llaves {} en los if

//Defino una constante(variable estatica) para el puerto 
//Desde aplicaciones con io.js/node.js puedo obtener las variables de entorno de mi sistema operativo
//La siguiente linea nos permite una asignacion por defecto.
const port = process.env.PORT || 8080

//Defino una constante para el servidor
/*Callbacks: funciones que se ejecutan despues de que algun 
metodo asincrono (node es una plataforma asincrona / no bloquea el io (imput/output))
a terminado su ejecucion. cuando hacemos una operacion en node, esta operacion 
va a una cola de operaciones (eventlopp: ciclo que corre en el procesador constantemente
verificando que tareas hay por ejecutar, cuando las tareas se ejecutan el va a notificar 
un evento al modulo que esta pidiendo que se llame esa tarea)*/
/*Los callbacks nos permiten tener aplicaciones que puedan tener alta concurrencia,
 aplicaciones en tiempo real*/

//Ahora vamos a usar eventemiters

/* Un eventemiter es un mecanismo de io.js o de node que me permite emitir eventos
y escuchar esos eventos*/

/*el server ademas de recibir un callback tambien es un evenemiter */

function onRequest(req, res) {
	res.end('Aprender usando un repositorio en git es una grandiosa idea')
}
function onListening(){
	console.log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢')
	console.log('El servidor ha iniciado y está escuchando en el puerto: ' + port)
}

const server = http.createServer()
server.listen(port)

//Acá estan los evenemiters request, listening...
//Esto siginifica que en la peticion que se haga al server el va a ejecutar la funcion onReques
server.on('request', onRequest)
//Y que cada que este escuchando a un puerto va a ejecutar la funcion onListening
server.on('listening', onListening)


