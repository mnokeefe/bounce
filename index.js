var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve the server
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// Serve the client
app.get('/client', function(req, res) {
  res.sendfile('client.html');
});

// Show connections to the server
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

// Stress messages
// TODO: Make this a switch statement
io.on('connection', function(socket) {
  socket.on('no stress', function() {
    console.log('no stress');
    io.emit('no stress', {
        that: 'only'
      , '/crew': 'Stress'
    });
  });
  socket.on('moderate stress', function() {
    console.log('moderate stress');
    io.emit('moderate stress', {
        that: 'only'
      , '/crew': 'Stress'
    });
  });
  socket.on('severe stress', function() {
    console.log('STRESSED! STRESSED!');
    io.emit('severe stress', {
        that: 'only'
      , '/crew': 'Stress'
    });
  });
});

// Server
http.listen(3000, function() {
  console.log('listening on *:3000');
});