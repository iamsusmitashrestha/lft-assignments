export class Background {
  constructor(game) {
    this.game = game;
    this.width = 36;
    this.image = document.getElementById("background");
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      900,
      504,
      0,
      0,
      this.game.width,
      this.game.height
    );
  }
}
