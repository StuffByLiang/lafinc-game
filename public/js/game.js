var config = {
    type: Phaser.AUTO,
    width: $(window).width(),
    height: $(window).height(),
    physics: {
      default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create
    }
};

var phaser = new Phaser.Game(config);

function preload () {
    this.load.image('player', '/sprites/red_box.png');
    this.load.image('background', '/sprites/background.png');
    this.load.image('wall', '/sprites/wall.png');
}

function create () {
  game = this;
  var background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0, 0);

  this.players = this.physics.add.group(); //add a new group
  this.blocks = this.physics.add.group();//game blocks ex. wall
  socket = io();
  ready();
}

function addPlayer(playerData) {
  var player = game.add.image(playerData.x, playerData.y, 'player').setOrigin(0.5, 0.5).setDisplaySize(48, 48);

  //copy over properties from playerData into the created variable called player
  for( var i in playerData ) {
    player[i] = playerData[i];
  }

  game.players.add(player); //add the player that we just created above
}

function addBlock(blockData){
  var {x, y, type, width, height} = blockData;

  var block = game.add.image(x, y, 'player').setOrigin(0.5, 0.5).setDisplaySize(width, height);

  for( var i in blockData ) {
    block[i] = blockData[i];
  }

  game.blocks.add(block);//
}
