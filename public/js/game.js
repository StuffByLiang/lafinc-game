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
}

function create () {
  game = this;
  var background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0, 0);

  this.players = this.physics.add.group(); //add a new group

  socket = io();
  ready();
}

function addPlayer(playerData) {
  var player = game.add.image(playerData.x, playerData.y, 'player').setOrigin(0.5, 0.5).setDisplaySize(48, 48);

  //copy over properties from playerData into the created variable called player
  for( i in playerData ) {
    player[i] = playerData[i];
  }

  game.players.add(player); //add the player that we just created above
}
