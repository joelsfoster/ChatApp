// Start an Express app that is an HTTP server
var app = require('express')();
var http = require('http').Server(app);
// This HTTP server is going to utilize socket.io
var io = require('socket.io')(http);

// Route the app to index.html
app.get('', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// When a client connection is established, log it to the console
io.on('connection', function(socket){
  console.log('a user connected');
  // When server receives a 'chat message' event from client, broadcast it as...
  // ...a 'chat message' event to all other clients
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
  // When a client is disconnected, log it to the console
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Listen on port "portnum"
var portnum = 3000
http.listen(portnum, function () {
  console.log("app.js is now listening on port " + portnum);
});
