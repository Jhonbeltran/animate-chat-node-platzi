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
const server = http.createServer()

//Le doy al server el puerto al cual va a escuchar nuestra app
server.listen(port)

//Desde consola podemos usar $PORT=8081 por ejemplo para cambiar la ruta del puerto
