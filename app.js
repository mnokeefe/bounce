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
app.get('/scoreboard', routes.scoreboard);
app.get('/matter', routes.matter); // Temp route for testing matter.js

// Server
srv.listen(3012, function() {
  console.log('listening on port 3012');
});


// SOCKETS
////////////////////////////////////////////////////////////////////////////////

// Create client list
var clients = {};

// TODO: Get a random client
function randomClient() {
  var objectLength = Object.keys(clients).length;
  var random = Math.floor(Math.random()*objectLength);
  var selected = clients[random];
  console.log(selected);
  return selected;
}

io.on('connection', function(socket) {

  // Add connections to the clients list
  socket.on('add a bouncer', function(data) {
    clients[data.username] = {
      'socket': socket.id
    };
    console.log(data.username + ' connected');

    // *****DEBUG
    console.log('client:' + randomClient());

    // Add to scoreboard
    io.emit('add bouncer', data.username);
  });

  // Scoreboard connection
  // TODO: separate the score board in to its own socket.io namespace
  var keys = Object.keys(clients);
  io.emit('add all live bouncers', keys);

  // Remove disconnected sockets from the clients list
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
  socket.on('drop the bomb', function() {
    console.log('We\'re off!');
    // TODO: send ball to random client, at the moment it sends to all
    io.emit('get bomb');
  });

  // Pass the bomb
  socket.on('pass the bomb', function() {
    console.log('Pass it');
    // TODO: send ball to random client
  });
});