var express = require('express');
var app = express();
var http = require('http').createServer(app);
global.io = require('socket.io')(http);

app.use(express.static('public'));

var Game = require('./src/server/game.js');
global.game = new Game();
io.on('connection', function(socket){

  console.log('a user connected WITH ID ' + socket.id);

  game.newPlayer(socket.id); //create a new player

  //send the connected client list of all players
  var playerData = [];
  var blockData = [];
  game.iteratePlayers((player) => {
    var data = {
      x: player.x,
      y: player.y,
      id: player.id
    }

    playerData.push(data);
  });

  socket.emit('connectedPlayers', playerData);

  game.iterateBlocks((block) => {
    var data = {
      x: block.x,
      y: block.y,
      width: block.width,
      height: block.height,
      type: block.type,
    }

    blockData.push(data);
  });

  socket.emit('createBlocks', blockData);

  //send to every other client that a new one has connected
  socket.broadcast.emit('newPlayer', game.getPlayerById(socket.id)); // send everyone the data of self

  socket.on('disconnect', function(){
    game.deletePlayerById(socket.id); //delete player
    console.log('user disconnected');
  });

  socket.on('keyDown', function(key){
    console.log('KeyDown: ' + key);
    switch(key) {
      case 'w':
        game.getPlayerById(socket.id).pressed.up = true;
        break;
      case 'a':
        game.getPlayerById(socket.id).pressed.left = true;
        break;
      case 's':
        game.getPlayerById(socket.id).pressed.down = true;
        break;
      case 'd':
        game.getPlayerById(socket.id).pressed.right = true;
    }
  });
  socket.on('keyUp', function(key){
    console.log('KeyUp: ' + key);
    switch(key) {
      case 'w':
        game.getPlayerById(socket.id).pressed.up = false;
        break;
      case 'a':
        game.getPlayerById(socket.id).pressed.left = false;
        break;
      case 's':
        game.getPlayerById(socket.id).pressed.down = false;
        break;
      case 'd':
        game.getPlayerById(socket.id).pressed.right = false;
    }
  });

});
http.listen(3000, () => {
  console.log('listening on *:3000')
})
