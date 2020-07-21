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
app.get('/',function (request, response) {
    console.log("Nuevo get");
    response.sendFile(__dirname + '/index.html');
});

app.get('/login',function (request, response) {
    console.log("Nuevo log");
    response.sendFile(__dirname + '/login.html');
});