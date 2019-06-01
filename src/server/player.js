class Player {
  constructor(id) {
    this.x = 100;
    this.y = 100;
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
    this.x -= this.speed;
  }
  moveUp() {
    this.y -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }
  moveDown() {
    this.y += this.speed;
  }
}

module.exports = Player;
