export class Bird {
  constructor(game) {
    this.game = game;
    this.height = 24;
    this.width = 48;
    this.ySpeed = 1;
    this.g = 1;
    this.x = 50;
    this.y = this.height;
    this.animationState = 0;
    this.image = document.getElementById("bird");

    this.interval = setInterval(() => {
      if (!this.game.started) return;
      if (this.animationState < 6) {
        this.animationState++;
      } else {
        this.animationState = 1;
      }
    }, 100);

    this.gravityInterval = setInterval(() => {
      if (!this.game.started) return;

      this.ySpeed += this.g;
    }, 200);
  }

  cleanup() {
    clearInterval(this.gravityInterval);
    clearInterval(this.interval);
  }

  draw(context) {
    let angle = 0;
    angle = (this.ySpeed * 2.5 * Math.PI) / 180;
    context.rotate(angle);

    context.drawImage(
      this.image,
      ((this.animationState - 1) % 3) * 1000,
      this.animationState <= 3 ? 0 : 1000,
      1000,
      1000,
      this.x,
      this.y,
      this.width,
      this.height
    );

    context.rotate(-angle);
  }

  update() {
    this.y += this.ySpeed;
  }
}
