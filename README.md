# Práctica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-Yeixon98/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-Yeixon98/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-Yeixon98/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-Yeixon98?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-Yeixon98&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-Yeixon98)

# Introducción

En esta practica se nos pedia desarrollar dos programas, uno que funcionara como servidor, recibiendo peticiones y otro que seria el cliente que generaria dichas peticiones, todo esto para el manejo de notas [Practica 9](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Yeixon98), todo ello a través de sockets.

# Desarrollo

### <b><u>Cliente</u></b>

Empezaremos por el cliente, la funcion del mismo, es realizar una peticion y mantenerse conectado al servidor hasta que se reciba una respuesta, para esto, empezamos definiendo la clase `Client` que es la representacion del cliente, el cual recibe el puerto por el cual se conectara al servidor. Luego esta el metodo `start` que da inicio a la peticion, el cual es ejecutado desde el index.ts, que no es mas que un yargs, para ser mas exacto el mismo que el de la Practica 9, aunque un poco modificado, pero los argumentos son iguales.

Esta funcion `start` recibe como argumento la peticion a realizar; seguido crea un socket, gracias al modulo `net`, con la funcion `connect`, retornando un objecto Sokect; este objeto se le pasa a otra clase `EventEmitterClient`, que es la que nos permitira gestionar mejor los datos que llegan por el socket, registrando dos manjadores de eventos, como son el `onData` que acumulara toda la informacion proveniente dle servidor, escrita en el socket y el `onEnd` hara que se emita un evento de respuesta, (`response`) con toda la informacion recibida; el manejador de la respuesta, el `onResponse` se encuentra en la clase `Client`, que es el que depoendiendo de dicha respuesta, le informara al usuario si su peticion se puedo llevar acabo o hubo algun problema. Al final de todo esto, se encuentra el metodo wirte de un socket, sin el cual no podriamos enviar nada por la conexcion, pues este, esta al final de la funcion `start` permitiendonos enviar la peticion por el Socket;

### <b><u>Servidor</u></b>

En cuanto al lado del servidor, todo empieza en el index.ts, que es el encargado de levantar el servidor y ponerlo a la "escucha", para ello, se desarrollo una clase `Server` que es la representacion del mismo, que recibe por argumentos el puerto por el cual estara resibiendo peticiones, seguido de la funcion `start`.

La funcion `start` crea un servidor, gracias al modulo `net` y su funcion `createServer` que recibe unas opciones y una callback, que dicha callback posee un socket, que es la conection que usaremos. dicha conecion se le pasa como argumento a otra clase, `EventEmitterServer`, esta clase nos permite distinguir las diferentes peticiones, ya que en su evento `onData`, esta buscando cada vez que se activa una combinacion de caracteres, en este caso "\n", esto nos permitira diferenciar cada peticion que recibe, estos caracteres, estan configurados del lado del cliente, para que cada vez que termine de realizar al peticion envie dichos caracteres, para que asi el server entienda que termino una peticion; pues una vez se encuentra, se toma toda la informacion que hay delante en el buffer y se emite un evento, `onRequest`, activando el manejador del mismo definido en la clase `Server` que gracias a el manejador de notas de la Practica 9, nos permitia gestionar las notas; para luego responderle al cliente el resultado de su peticion, este se realiza con el uso del write, y como hay que indicarle al cleinte que su petcion ha sido resuelta y ya tiene la respuesta, se corta la conexion con el mismo, con la funcion `end` de un socket. Para finalizar, y que todo lo anterior funcione de forma correcta, hay que poner a "escuchar", esto se hace con la funcion `listen` de un socket que le indicas el puerto, y todo lo que llegue al mismo lo interpretara.

### <b><u>Otros</u></b>
En cuanto a las peticiones y respuestas, se defineron unos tipos de datos, que lo representan.

Cuando se hace referencia a un evento y se escribe `on***`, en cuanto a codigo significa: 
```ts
socket.on('***', () => {})
```

Toda la informacion que viaja a traves de los socket, son strings, por lo cual para poder enviar los datos de un lado al otro, usamos las funciones `stringify` y `parse` de `JSON`.

<br>

<u><b>Comandos para prueba rapida</b></u>

Servidor:
```bash
$ tsc && node dist/server/index.js
```

Cliente:

 * Añadir Nota: 
 ```bash
 $ node dist/client/index.js add --user="Test" --title="Rapid Test" --body="This is a rapid test" --color="yellow"
 ```
 * Leer Nota:
 ```bash
 $ node dist/client/index.js read --user="Test" --title="Rapid Test"
 ```
