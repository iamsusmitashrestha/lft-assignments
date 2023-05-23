import { Background } from "./background.js";
import { Bird } from "./bird.js";
import { Obstacle } from "./obstacle.js";

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gapSize = 40;
    this.pipeGap = 160;
    this.score = 0;
    this.started = false;
    this.collision = false;
    this.background = new Background(this);
    this.bird = new Bird(this);
    this.obstacles = Array.from({ length: 3 }).map((_, index) => {
      return new Obstacle(this, index);
    });
  }

  draw(context) {
    if (this.collision) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    this.background.draw(context);

    this.obstacles.forEach((obstacle) => {
      obstacle.draw(context);
      this.obstacleLength++;
    });

    this.bird.draw(context);
  }

  update() {
    if (this.collision) return;

    this.obstacles.forEach((obstacle) => {
      obstacle.update();
    });

    this.bird.update();

    if (
      this.obstacles.some(
        (obstacle) =>
          (this.bird.y + this.bird.height / 1.8 < obstacle.yTop ||
            this.bird.y + this.bird.height / 1.8 >
              obstacle.yTop + this.gapSize) &&
          this.bird.x + obstacle.width > obstacle.x &&
          this.bird.x < obstacle.x + obstacle.width
      ) ||
      this.bird.y + this.bird.height / 2 >= this.height
    ) {
      this.collision = true;
      document.getElementById("gameOver").style.display = "block";
      canvas.style.display = "none";
      document.getElementById("score").style.top = "30%";

      const highestScore = document.getElementById("highest-score");
      const currentHighScore = localStorage.getItem("high-score-flappy") || "0";

      if (this.score > currentHighScore) {
        localStorage.setItem("high-score-flappy", this.score);
        highestScore.innerText = this.score;
      } else {
        highestScore.innerText = currentHighScore;
      }
    }

    document.querySelector("#score").innerText = this.score;
  }

  restart() {
    this.bird.cleanup();

    this.score = 0;
    this.started = true;
    this.collision = false;
    this.background = new Background(this);
    this.bird = new Bird(this);
    this.obstacles = Array.from({ length: 3 }).map((_, index) => {
      return new Obstacle(this, index);
    });

    document.getElementById("gameOver").style.display = "none";
    canvas.style.display = "block";
    document.getElementById("score").style.top = "20%";
  }
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const landing = document.getElementById("landing");
  const play = document.getElementById("play-btn");
  const playAgain = document.getElementById("play-again");
  const score = document.getElementById("score");

  const ctx = canvas.getContext("2d");
  const game = new Game(canvas.width, canvas.height);

  const startGame = () => {
    landing.style.display = "none";
    canvas.style.display = "block";
    score.style.display = "block";

    game.started = true;

    gameLoop();
  };

  const gameLoop = () => {
    game.update();
    game.draw(ctx);
    this.requestAnimationFrame(gameLoop);
  };

  play.addEventListener("click", startGame);
  playAgain.addEventListener("click", () => {
    game.restart();
  });

  window.addEventListener("keydown", function (e) {
    if (e.code === "ArrowUp" || e.code === "KeyW") {
      clearInterval(this.gravityInterval);
      game.bird.ySpeed = -1.5;
    }
  });
});
