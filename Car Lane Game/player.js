export class Player {
  constructor(game) {
    this.lane = 1;
    this.game = game;
    this.laneWidth = game.width / 3;
    this.width = this.laneWidth - 70;
    this.height = (this.width / 3) * 2;

    this.image = document.getElementById("yellow-car");

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key.toUpperCase() === "D") {
        this.lane++;
      }
      if (e.key === "ArrowLeft" || e.key.toUpperCase() === "A") {
        this.lane--;
      }
      if (this.lane < 1) {
        this.lane = 1;
      }
      if (this.lane > 3) {
        this.lane = 3;
      }
    });
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      260,
      540,
      (this.laneWidth - this.width) / 2 + this.laneWidth * (this.lane - 1),
      this.game.height - this.height - 2,
      this.width,
      this.height
    );
  }

  update() {}
}
