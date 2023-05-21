import { Road } from "./road.js";
import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

const NUM_CARS = 500;

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.score = 0;
    this.road = new Road(this);
    this.player = new Player(this);
    this.obstacles = Array.from({ length: NUM_CARS }).map((_, index) => {
      return new Obstacle(this, index);
    });

    this.collision = false;
  }

  restart() {
    this.score = 0;
    this.road = new Road(this);
    this.player = new Player(this);
    this.obstacles = Array.from({ length: NUM_CARS }).map((_, index) => {
      return new Obstacle(this, index);
    });

    this.collision = false;
    const boom = document.getElementById("boom");
    const tryAgain = document.getElementById("try-again");

    boom.style.display = "none";
    tryAgain.style.display = "none";
  }

  update() {
    if (this.collision) return;
    this.player.update();
    this.road.update();

    this.obstacles.forEach((obstacle) => {
      obstacle.update();
      if (obstacle.lane === this.player.lane) {
        if (
          obstacle.y > this.height - 2 * this.player.height &&
          obstacle.y < this.height
        ) {
          setTimeout(() => {
            this.collision = true;
          }, 10);
          this.gameOver();
        }
      }
    });

    this.score = this.obstacles.filter(
      (obstacle) => obstacle.y > this.height
    ).length;

    document.querySelector("#score").innerText = this.score;
  }

  gameOver() {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    const boom = document.getElementById("boom");
    const tryAgain = document.getElementById("try-again");
    const tryAgainTitle = document.getElementById("try-again-heading");

    const highestScore = document.getElementById("highest-score");
    const currentHighScore = localStorage.getItem("high-score") || "0";
    if (this.score > currentHighScore) {
      localStorage.setItem("high-score", this.score);
      highestScore.innerText = this.score;
      tryAgainTitle.innerText = "Congratulations !";
    } else {
      tryAgainTitle.innerText = "Oops! Try Again";
    }

    boom.style.top = rect.height + "px";
    boom.style.left = rect.x + 25 + (500 / 3) * (this.player.lane - 1) + "px";
    boom.style.display = "block";
    tryAgain.style.display = "flex";
  }

  draw(context) {
    if (this.collision) return;
    this.road.draw(context);
    this.player.draw(context);
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(context);
    });
  }
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const landing = document.getElementById("landing");
  const highestScore = document.getElementById("highest-score");
  highestScore.innerText = localStorage.getItem("high-score") || "0";

  const ctx = canvas.getContext("2d");
  const game = new Game(canvas.width, canvas.height);

  const startGame = () => {
    landing.style.display = "none";
    gameLoop();
  };
  const gameLoop = () => {
    game.update();
    game.draw(ctx);
    this.requestAnimationFrame(gameLoop);
  };

  const restartKeyListener = (e) => {
    if (e.key === " ") {
      game.restart();
    }
  };

  const keyListener = (e) => {
    if (e.key === " ") {
      startGame();
      window.addEventListener("keyup", restartKeyListener);

      window.removeEventListener("keyup", keyListener);
    }
  };

  window.addEventListener("keyup", keyListener);
});
