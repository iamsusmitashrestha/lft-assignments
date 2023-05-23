import { getRandomValue } from "./random.js";

export class Obstacle {
  constructor(game, index) {
    this.game = game;
    this.index = index;
    this.width = 36;
    this.image = document.getElementById("pipe");
    this.imageInverted = document.getElementById("pipe-inverted");
    this.minimumYTop = 20;
    this.maximumYTop = this.game.height - this.game.gapSize - this.minimumYTop;
    this.yTop = getRandomValue(this.minimumYTop, this.maximumYTop);
    this.x = this.game.pipeGap * (this.index + 1) + this.game.width / 2;
  }

  draw(context) {
    //down
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      217,
      this.x,
      this.yTop + this.game.gapSize,
      this.width,
      217
    );

    //up
    context.drawImage(
      this.imageInverted,
      0,
      0,
      this.width,
      217,
      this.x,
      -217 + this.yTop,
      this.width,
      217
    );
  }

  update() {
    this.x--;
    if (this.x + this.width < 0) {
      this.yTop = getRandomValue(this.minimumYTop, this.maximumYTop);
      this.x = this.game.pipeGap * this.game.obstacles.length - this.width;
    }

    if (this.x + this.width - 60 === 0) {
      this.game.score++;
    }
  }
}
