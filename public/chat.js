//make connection 
var socket = io.connect('http://localhost:4000');  
$(document).ready(function(){
//on clicking submit button send data to server 
$("#send").click(function(){
     name = $("#name").val(); 
     message = $("#message").val(); 
    socket.emit('chat', {
        message:message,
        name : name
    });
    $("#message").val('');
});

$("#message").keypress(function(e){
    name = $("#name").val(); 
     message = $("#message").val(); 
    socket.emit('typing', name);
    if (e.keyCode === 13) {
        socket.emit('chat', {
            message:message,
            name : name
        });
        $("#message").val('');
    }
});

$('#message').keyup(function(){
    setTimeout(function(){ 
        socket.emit('typing-stopped');
    },5000);
});
});

//listen for events, server send back the chat-data which is received from the any socket, now display the message  
socket.on('chat-data', function(data){  //find the chat-data on server index.js
    $("#status").html('');
    $("#output").append('<p><b>'+data.name+':</b>'+data.message+'</p>');
    //scroll to bottom of the div by default \
    var height = $("#chat-window")[0].scrollHeight;
    $("#chat-window").stop().animate({ scrollTop: height}, 1000);
});

socket.on('typing-msg', function(data){
    $("#status").html('<p><em>'+data+' is typing the message</em>');
});



socket.on('stopped-typing', function(){
    $("#status").html('');
})