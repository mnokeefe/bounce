// Express
var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./app/routes');


// All environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', routes.index);
app.get('/server', routes.server);

// Server
http.listen(3000, function() {
  console.log('listening on *:3000');
});


// Client connections to server
io.on('connection', function(socket) {

  // Create client list
  var clients = [];
  socket.on('add-user', function(data) {
    clients[data.username] = {
      "socket": socket.id
    };
    // TODO: automatically build client list on server
    // io.emit('add-user', {
    //     that: 'only'
    //   , '/server': clients[data.username]
    // });
    console.log(data.username + ' connected');
  });

  // Removing the socket on disconnect
  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
        delete clients[name];
        console.log(data.username + ' disconnected');
        break;
      }
    } 
  })

});


// Stress messages
io.on('connection', function(socket) {

  socket.on('no stress', function() {
    console.log('no stress');
    io.emit('no stress', {
        that: 'only'
      , '/': 'Stress'
    });
  });

  socket.on('moderate stress', function() {
    console.log('moderate stress');
    io.emit('moderate stress', {
        that: 'only'
      , '/': 'Stress'
    });
  });

  socket.on('severe stress', function() {
    console.log('STRESSED! STRESSED!');
    io.emit('severe stress', {
        that: 'only'
      , '/': 'Stress'
    });
  });

});