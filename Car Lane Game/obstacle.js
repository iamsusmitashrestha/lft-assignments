export class Obstacle {
  constructor(game, index) {
    this.lane = Math.floor(Math.random() * 3) + 1;
    this.game = game;
    this.laneWidth = game.width / 3;
    this.width = this.laneWidth - 70;
    this.height = (this.width / 3) * 2;
    this.x = 1;
    this.y = index * -1 * (4 * this.height);
    this.image = document.getElementById("red-car");
    this.speed = 1;
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      260,
      540,
      (this.laneWidth - this.width) / 2 + this.laneWidth * (this.lane - 1),
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.y = this.y + this.speed;

    const level = Math.floor(this.game.score / 10);

    if (level % 2 === 1) {
      this.speed = 1 + (level + 1) / 2;
    }
  }
}
