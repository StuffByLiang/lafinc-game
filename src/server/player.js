class Player {
  constructor(id) {
    this.x = 100;
    this.y = 100;
    this.width = 48;
    this.height = 48;
    this.id = id;
    this.speed = 4;
    // this.movable = true;
    this.pressed = {
      left: false,
      right: false,
      up: false,
      down: false
    };
  }
  update() {
    if(this.pressed.left && this.canMove("left"))
      this.moveLeft();
    if(this.pressed.right && this.canMove("right"))
      this.moveRight();
    if(this.pressed.up && this.canMove("up"))
      this.moveUp();
    if(this.pressed.down && this.canMove("down"))
      this.moveDown();
  }
  moveLeft() {
    this.x -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }
  moveUp() {
    this.y -= this.speed;
  }
  moveDown() {
    this.y += this.speed;
  }
  canMove(direction) {
    var canMove = true;

    var xx=0, yy=0; //temporary relative x, y variables

    switch(direction) {
      case "left":
        xx = -this.speed;
        break;
      case "right":
        xx = +this.speed;
        break;
      case "up":
        yy = -this.speed;
        break;
      case "down":
        yy = this.speed;
    }

    game.iterateBlocks((block) => {
      if(this.x - block.x <= this.speed && this.x - block.x > 0) this.x -= this.x - block.x - this.speed;
      if(block.x - this.x <= this.speed && block.x - this.x > 0) this.x -= block.x - this.x - this.speed;
      if(this.y - block.y <= this.speed && this.y - block.y > 0) this.y -= this.y - block.y - this.speed;
      if(block.y - this.y <= this.speed && block.y - this.y > 0) this.y -= block.y - this.y - this.speed;
      if(Math.abs(this.x - block.x + xx) <= (block.width + this.width)/2 && Math.abs(this.y - block.y + yy) <= (block.height + this.height)/2 ) {
        canMove = false;
        return;
      }
    });

    if(canMove) return true;
    else return false;

  }
}

module.exports = Player;
