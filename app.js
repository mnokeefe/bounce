// Express
var express = require('express');
var path = require('path');
var app = require('express')();
var srv = require('http').Server(app);
var io = require('socket.io')(srv);

var routes = require('./app/routes');

// All environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', routes.index);
app.get('/server', routes.server);

// Server
srv.listen(3000, function() {
  console.log('listening on port 3000');
});


// SOCKETS
////////////////////////////////////////////////////////////////////////////////

// var crew = io.of('/crew');

// crew.on('connection', function(socket){

//   socket.join('crew');

// });






// STRESS LEVELS
////////////////////////////////////////////////////////////////////////////////

io.on('connection', function(socket) {

  // CONNECT
  //////////////////////////////////////////////////////////////////////////////

  // Create client list
  var clients = [];

  // Add new clients to the list
  socket.on('add-user', function(data) {
    clients[data.username] = {
      "socket": socket.id
    };

    // Confirm the connection on server log
    console.log(data.username + ' connected');
  });

  // DISCONNECT
  //////////////////////////////////////////////////////////////////////////////

  // Removing the socket on disconnect
  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
        console.log(name + ' disconnected');
        delete clients[name];
        break;
      }
    }
  });


  socket.on('no stress', function() {
    console.log('no stress');
    io.emit('no stress');
  });

  socket.on('moderate stress', function() {
    console.log('moderate stress');
    io.emit('moderate stress');
  });

  socket.on('severe stress', function() {
    console.log('STRESSED! STRESSED!');
    io.emit('severe stress');
    // io.to('crew').emit('severe stress');
  });

});