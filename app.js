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

io.on('connection', function(socket) {

  // CONNECT
  //////////////////////////////////////////////////////////////////////////////

  // Create client list
  var clients = [];

  // Add new clients to the list
  socket.on('add-user', function(data) {
    clients[data.username] = {
      'socket': socket.id
    };

    io.emit('add crewmember', { name: data.username });

    console.log(data.username + ' connected');
  });

  // DISCONNECT
  //////////////////////////////////////////////////////////////////////////////

  // Removing the socket on disconnect
  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
        console.log(name + ' disconnected');

        // Delete from Stress Faker
        io.emit('delete crewmember', { name: name });

        delete clients[name];
        break;
      }
    }
  });

  // STRESS! STRESS!
  //////////////////////////////////////////////////////////////////////////////

  socket.on('no stress', function(data) {
    // console.log('no stress', data.name);

    for(var name in clients) {
      if(clients[name].socket === socket.id) {

        io.emit('no stress', { name: name });

        console.log(name + ' no stress');
        delete clients[name];
        break;
      }
    }
  });

  socket.on('moderate stress', function() {
    console.log('moderate stress');
    io.emit('moderate stress');
  });

  socket.on('severe stress', function() {
    console.log('STRESSED! STRESSED!');
    io.emit('severe stress');
  });

});