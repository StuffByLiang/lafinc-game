var Player = require('./player.js');
var Block = require('./block.js');
var fs = require("fs");
var readline = require('readline');

class Game {
  constructor() {
    this.players = [];
    this.settings = {
      FPS: 60
    }
    this.blocks = [];
    this.tick = setInterval(this.update.bind(this), 1000/this.settings.FPS);

    this.readMap("maps/map1")
    //this.newBlock(200, 200, 64, 64, "wall")
  }
  readMap(mapFile){
    var x, y, width, height, type;

    var myInterface = readline.createInterface({
      input: fs.createReadStream(mapFile)
    });

    myInterface.on('line', function (line) {
      line = line.split(" ");
      //reads map files line by line for blocks

      y = parseInt(line[1], 10);
      x = parseInt(line[0], 10);
      width = parseInt(line[2], 10);
      height = parseInt(line[3], 10);
      type = line[4];
      //saves temp block parameters

      game.newBlock(x, y, width, height, type);
      //creates each new block

    });
  }
  update() {
    var data=[];

    this.iteratePlayers((player) => {
      player.update(); //update player

      //add their x & y positions to a data object that will be sent to every client
      data.push({
        id: player.id,
        x: player.x,
        y: player.y
      });
    })

    io.emit('updatePlayers', data) //send data to every player
  }
  newPlayer(id) {
    this.players[id] = new Player(id);
  }
  getPlayerById(id) {
    //returns the player object that represents id
    if(this.players[id]===undefined) {
      console.log("Player " + id + " does not exist!!!")
    }
    return this.players[id];
  }
  deletePlayerById(id) {
    delete this.players[id];
  }
  iteratePlayers(callbackFn) {
    // iterates through players with a specific function. example of usage to print out every exisiting player id
    // this.iteratePlayers(function(player) {
    //   console.log(player.id)\
    // })
    for(var id in this.players) {
      callbackFn(this.players[id]);
    }
  }
  newBlock(x, y, width, height, type){
    this.blocks.push(new Block(x, y, width, height, type));
  }
  iterateBlocks(callbackFn){
    //allows iteration throgh every block
    for (var i in this.blocks){
      callbackFn(this.blocks[i]);
    }
  }
}

module.exports = Game;
