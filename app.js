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
app.get('/weather', routes.weather);

// Server
srv.listen(3011, function() {
  console.log('listening on port 3011');
});


// SOCKETS
////////////////////////////////////////////////////////////////////////////////

// Create client list
var clients = {};

io.on('connection', function(socket) {

  // CLIENT CONNECT
  // Add connections to the clients list
  //////////////////////////////////////////////////////////////////////////////

  socket.on('add-user', function(data) {
    clients[data.username] = {
      'socket': socket.id
    };

    io.emit('add crewmember', data.username);

    console.log(data.username + ' connected');
    console.log(clients);
  });

  // FAKER CONNECT
  // TODO: separate the faker in to its own socket.io namespace
  //////////////////////////////////////////////////////////////////////////////

  var keys = Object.keys(clients);
  io.emit('stress fake connection', keys);

  // DISCONNECT
  // Remove disconnected sockets from the clients list
  //////////////////////////////////////////////////////////////////////////////

  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
        console.log(name + ' disconnected');

        // Delete from Stress Faker UI
        io.emit('delete crewmember', { name: name });

        delete clients[name];
        break;
      }
    }
  });

  // STRESS! STRESS!
  // Send messages from Stress Faker to correct connection
  //////////////////////////////////////////////////////////////////////////////

  socket.on('no stress', function(data) {
    console.log(data.name + ': Low stress');
    if (clients[data.name]) {
      socket.to(clients[data.name].socket).emit('no stress');
    } else {
      console.log('User does not exist: ' + data.name); 
    }
  });

  socket.on('moderate stress', function(data) {
    console.log(data.name + ': Moderate stress');
    if (clients[data.name]) {
      socket.to(clients[data.name].socket).emit('moderate stress');
    } else {
      console.log('User does not exist: ' + data.name); 
    }
  });

  socket.on('severe stress', function(data) {
    console.log(data.name + ': High stress');
    if (clients[data.name]) {
      socket.to(clients[data.name].socket).emit('severe stress');
    } else {
      console.log('User does not exist: ' + data.name); 
    }
  });
});