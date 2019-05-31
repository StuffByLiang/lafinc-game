var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var Player = require('./src/server/player.js');

var players = [];
var settings = {
  FPS: 60
}

function update() {
  //for every player, update them.
  for(var id in players) {
    var player = players[id];
    player.update();
  }

  io.emit('update', data) // update every player
}

setInterval(update, 1000/settings.FPS);

io.on('connection', function(socket){

  console.log('a user connected WITH ID ' + socket.id);

  players[socket.id] = new Player();

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('keyDown', function(key){
    console.log('KeyDown: ' + key);
    switch(key) {
      case 'w':
        players[socket.id].pressed.up = true;
        break;
      case 'a':
        players[socket.id].pressed.left = true;
        break;
      case 's':
        players[socket.id].pressed.down = true;
        break;
      case 'd':
        players[socket.id].pressed.right = true;
    }
  });
  socket.on('keyUp', function(key){
    console.log('KeyUp: ' + key);
    switch(key) {
      case 'w':
        players[socket.id].pressed.up = false;
        break;
      case 'a':
        players[socket.id].pressed.left = false;
        break;
      case 's':
        players[socket.id].pressed.down = false;
        break;
      case 'd':
        players[socket.id].pressed.right = false;
    }
  });

});
http.listen(3000, () => {
  console.log('listening on *:3000')
})
