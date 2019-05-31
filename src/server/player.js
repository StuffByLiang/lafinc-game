class Player {
  constructor() {
    this.x = 100;
    this.y = 100;
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
    if(this.pressed.left)
      this.moveLeft();
    if(this.pressed.right)
      this.moveRight();
    if(this.pressed.up)
      this.moveUp();
    if(this.pressed.down)
      this.moveDown();
  }
  moveLeft() {
    this.x -= speed;
  }
  moveUp() {
    this.y -= speed;
  }
  moveRight() {
    this.x += speed;
  }
  moveDown() {
    this.y += speed;
  }
}

module.exports = Player;
