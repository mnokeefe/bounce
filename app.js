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
app.use(express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/', routes.index);
app.get('/scoreboard', routes.scoreboard);

// Server
srv.listen(3012, function() {
  console.log('listening on port 3012');
});


// SOCKETS
////////////////////////////////////////////////////////////////////////////////

// TODO: Get a random client
function randomClient() {
  // var objectLength = Object.keys(clients).length;
  var selected = clients[Math.floor(Math.random()*clients.length)];
  console.log('selected object ' + selected);
  return selected;
}

io.sockets.on('connection', function (socket) {
    var user = addUser();
    socket.emit("welcome", user);
    socket.on('disconnect', function () {
        removeUser(user);
    });
    // socket.on("click", function() {
    //     currentWidth += 1;
    //     user.clicks += 1;
    //     if(currentWidth == winWidth) {
    //         currentWidth = initialWidth;
    //         io.sockets.emit("win", { message: "<strong>" + user.name + "</strong> rocks!" });
    //     }
    //     updateWidth();
    //     updateUsers();
    // });
});




var users = [];

var addUser = function() {
    var user = {
        name: 'Matt',
        clicks: 0
    }
    users.push(user);
    updateUsers();
    return user;
}
var removeUser = function(user) {
    for(var i=0; i<users.length; i++) {
        if(user.name === users[i].name) {
            users.splice(i, 1);
            updateUsers();
            return;
        }
    }
}
var updateUsers = function() {
    var str = '';
    for(var i=0; i<users.length; i++) {
        var user = users[i];
        str += user.name + ' <small>(' + user.clicks + ' clicks)</small>';
    }
    io.sockets.emit("users", { users: str });
}









// // Create client list
// var clients = [];

// io.on('connection', function(socket) {

//   // Add connections to the clients list
//   socket.on('add a bouncer', function(data) {
//     clients[data.username] = {
//       'socket': socket.id
//     };
//     console.log(data.username + ' connected');

//     // *****DEBUG
//     console.log(clients.length);
//     var selected = clients[Math.floor(Math.random()*clients.length)];
//     console.log('clients[0]: ' + clients[0])
//     console.log('selected object ' + selected);

//     // Add to scoreboard
//     io.emit('add bouncer', data.username);
//   });

//   // Scoreboard connection
//   // TODO: separate the score board in to its own socket.io namespace
//   var keys = Object.keys(clients);
//   io.emit('add all live bouncers', keys);

//   // Remove disconnected sockets from the clients list
//   socket.on('disconnect', function() {
//     for(var name in clients) {
//       if(clients[name].socket === socket.id) {
//         console.log(name + ' disconnected');

//         // Delete from scoreboard
//         io.emit('delete bouncer', { name: name });

//         delete clients[name];
//         break;
//       }
//     }
//   });

//   // KICK OFF!
//   socket.on('drop the bomb', function() {
//     console.log('We\'re off!');
//     // TODO: send ball to random client, at the moment it sends to all
//     io.emit('get bomb');
//   });

//   // Pass the bomb
//   socket.on('pass the bomb', function() {
//     console.log('Pass it');
//     // TODO: send ball to random client
//   });
// });