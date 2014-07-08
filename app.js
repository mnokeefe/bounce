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
app.get('/matter', routes.matter); // Temp route for testing matter.js

// Server
srv.listen(3012, function() {
  console.log('listening on port 3012');
});


// SOCKETS
////////////////////////////////////////////////////////////////////////////////

// Create client list
var clients = {};

io.on('connection', function(socket) {

  // CLIENT CONNECT
  // Add connections to the clients list
  //////////////////////////////////////////////////////////////////////////////

  socket.on('add a bouncer', function(data) {
    clients[data.username] = {
      'socket': socket.id
    };

    io.emit('add bouncer', data.username);

    console.log(data.username + ' connected');
    console.log(clients);
  });

  // SERVER CONNECT
  // TODO: separate the score board (server) in to its own socket.io namespace
  //////////////////////////////////////////////////////////////////////////////

  var keys = Object.keys(clients);
  io.emit('add all live bouncers', keys);

  // DISCONNECT
  // Remove disconnected sockets from the clients list
  //////////////////////////////////////////////////////////////////////////////

  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
        console.log(name + ' disconnected');

        // Delete from Stress Faker UI
        io.emit('delete bouncer', { name: name });

        delete clients[name];
        break;
      }
    }
  });

  // KICK OFF!
  // TODO: Start sending out the ball
  //////////////////////////////////////////////////////////////////////////////

  socket.on('drop the bomb', function() {
    console.log('We\'re off!');
    // TODO: send ball to random client
    io.emit('get bomb');
  });
});