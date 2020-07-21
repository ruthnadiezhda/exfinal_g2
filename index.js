//imports
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//configs
var app = express();
var server = http.Server(app);
var io = socketIO(server);

//server init, se arranca con server
server.listen(3000,function(){
    console.log("Servidor corriendo en el puerto 3000");
});

//express routes
app.get('/principal',function (request, response) {
    console.log("Nuevo get");
    response.sendFile(__dirname + '/index.html');
});

var connectedUsers=0;
app.get('/',function (request, response) {
    console.log("Nuevo log");
    response.sendFile(__dirname + '/login.html');

    io.on('connection', function (socket) {
        console.log("Usuario Conectado");

        connectedUsers++;
        io.emit('connUsers',connectedUsers);

        socket.on('disconnect', function(){
            console.log('Usuario Desconectado');
            connectedUsers--;
            io.emit('connUsers',connectedUsers);
        });

        socket.on('chat',function(msg){
            console.log("mensaje del cliente: " +  msg);

            io.emit("mensaje recibido",msg);

        });

    });



});

//Conexion con la BD
const express = require('express');
const mysql = require('mysql2');

const app = express();

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'exfinal'
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Conexión exitosa a base de datos");
});
