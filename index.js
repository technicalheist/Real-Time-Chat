var express = require('express');
var socket = require('socket.io');
//app setup 
var app = express();
var server = app.listen(4000, function(){
    console.log('Listening at 4000');
});


//static setup 
app.use(express.static('public'));


//socket setup 
var io = socket(server);
io.on('connection', function(socket){
    console.log('new socket connection made '+socket.id);
    //after clicking the send button, js file send the data to server, and server received it, js file emitted the chat, hence using on 'chat' 
    socket.on('chat', function(data){
        //server received data from client, now push it to all clients, using the sockets
        io.sockets.emit('chat-data', data);
    }); 

    socket.on('typing', function(data){
        socket.broadcast.emit('typing-msg',data);
    })

    socket.on('typing-stopped', function(){
        socket.broadcast.emit('stopped-typing');
    })
});
