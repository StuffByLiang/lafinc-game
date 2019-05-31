var config = {
        type: Phaser.AUTO,
        width: $(window).width(),
        height: $(window).height(),
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);

    function preload () {
        this.load.image('red_box', '/sprites/red_box.png');
        this.load.image('background', '/sprites/background.png');
    }

    function create () {
      var background = this.add.tileSprite(0, 0, config.width, config.height, "background").setOrigin(0, 0);
      player = this.add.image(100, 100, 'red_box');
    }
