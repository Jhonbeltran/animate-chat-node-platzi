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

//vamos a crear un callback que se va a ejecutar cada vez que se hace una peticion http
/*en este caso usaremos una funcion llamada onRequest dentro de http.createServer()*/
/*request es lo que se nos envia de parte del navegador, response es la respuesta que da el backend*/
function onRequest(req, res) {
	res.end('Aprender usando un repositorio en git es una grandiosa idea')
}

const server = http.createServer(onRequest)

//Le doy al server el puerto al cual va a escuchar nuestra app
/*como ultimo parametro .listen puede recibir un callback 
que se va a ejecutar cuando inicie el server, 
en este caso el callback va a ser una funcion llamada onListening que no recibe parametros
pues solo nos va a mostrar un mensaje en la consola que nos indica cuando arranca el server*/

function onListening(){
	console.log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢')
	console.log('El servidor ha iniciado y está escuchando en el puerto: ' + port)
}

server.listen(port, onListening)

//Desde consola podemos usar $PORT=8081 por ejemplo para cambiar la ruta del puerto
