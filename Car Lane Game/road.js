export class Road {
  constructor(game) {
    this.game = game;
    this.laneY = 0;
    this.laneSpeed = 15;
  }

  draw(context) {
    context.fillStyle = "#171717";
    context.fillRect(0, 0, this.game.width, this.game.height);
    context.lineWidth = 5;
    context.beginPath();
    context.setLineDash([6, 8]);
    context.moveTo(this.game.width / 3, this.laneY % this.laneSpeed);
    context.lineTo(this.game.width / 3, this.game.height);
    context.strokeStyle = "white";
    context.stroke();
    context.beginPath();
    context.setLineDash([6, 8]);
    context.moveTo((this.game.width / 3) * 2, this.laneY % this.laneSpeed);
    context.lineTo((this.game.width / 3) * 2, this.game.height);
    context.strokeStyle = "white";
    context.stroke();
  }

  update() {
    this.laneY++;
    const level = Math.floor(this.game.score / 10);

    if (level % 2 === 1) {
      if (this.laneSpeed > 5) {
        this.laneSpeed = 15 - 2 * level;
      } else {
        this.laneSpeed = 5;
      }
    }
  }
}
