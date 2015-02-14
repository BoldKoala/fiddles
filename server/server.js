var express = require('express');
var app = express();
var path = process.env.PORT || 8080;
var io = require('socket.io').listen(app.listen(path));

app.use(express.static(__dirname + '/../'));

io.on('connection',function(socket, a, b){
	socket.emit('message',socket.id);
	socket.on('send',function(d){
		socket.broadcast.emit('broadcast',d);
	})
	socket.on('sync',function(state){
		socket.broadcast.emit('move',state)
	})
})

console.log('listening at Port: 8080...');
