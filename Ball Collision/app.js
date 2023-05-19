class Ball {
  constructor(x, y, dx, dy, i, retractingX, retractingY) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.i = i;
    this.retractingX = false;
    this.retractingY = false;
  }

  draw() {
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball", "ball-" + this.i);
    ballElement.style.left = this.x + "px";
    ballElement.style.top = this.y + "px";
    ballElement.style.background = `rgb(${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    mainContainer.appendChild(ballElement);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + BALL_SIZE >= mainContainer.offsetWidth || this.x < 0) {
      if (!this.retractingX) {
        this.dx *= -1;
      }

      this.retractingX = true;
    } else {
      this.retractingX = false;
    }

    if (this.y + BALL_SIZE >= mainContainer.offsetWidth || this.y < 0) {
      if (!this.retractingY) {
        this.dy *= -1;
      }
      this.retractingY = true;
    } else {
      this.retractingY = false;
    }

    const ballElement = document.querySelector(".ball-" + this.i);
    ballElement.style.left = this.x + "px";
    ballElement.style.top = this.y + "px";
  }

  checkCollision() {
    for (let i = 0; i < balls.length; i++) {
      const otherBall = balls[i];
      if (otherBall !== this && this.isColliding(otherBall)) {
        this.handleCollision();
      }
    }
  }

  isColliding(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= BALL_SIZE;
  }

  handleCollision() {
    if (!this.retractingX && !this.retractingY) {
      this.dx *= -1;
      this.dy *= -1;
    }
  }
}

const balls = [];
const NUM_BALLS = 20;
const BALL_SIZE = 20;
const MAX_SPEED = 10;
const MIN_SPEED = 5;

const mainContainer = document.querySelector(".container");

for (let i = 0; i < NUM_BALLS; i++) {
  const x = Math.random() * (mainContainer.offsetWidth - BALL_SIZE) + BALL_SIZE;
  const y =
    Math.random() * (mainContainer.offsetHeight - BALL_SIZE) + BALL_SIZE;

  const dx =
    (Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED) *
    (Math.random() < 0.5 ? -1 : 1);
  const dy =
    (Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED) *
    (Math.random() < 0.5 ? -1 : 1);

  const ball = new Ball(x, y, dx, dy, i);
  balls.push(ball);
  ball.draw();
}

function moveBalls() {
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.move();
    const ballElement = document.querySelector(".ball-" + i);
    ballElement.style.left = ball.x + "px";
    ballElement.style.top = ball.y + "px";
  }
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.checkCollision();
  }
}

setInterval(moveBalls, 100);
