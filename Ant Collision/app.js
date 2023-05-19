const antRotationOffset = -70;

const getRotationAngle = (ant) => {
  const angle = (Math.atan2(ant.dy, ant.dx) * 180) / Math.PI;

  return angle.toFixed(4);
};

class Ant {
  constructor(x, y, dx, dy, i) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.i = i;
    this.retractingX = false;
    this.retractingY = false;
    this.smashed = false;
  }

  draw() {
    const antElement = document.createElement("div");
    antElement.classList.add("ant", "ant-" + this.i);
    antElement.style.left = this.x + "px";
    antElement.style.top = this.y + "px";
    antElement.dataset.index = this.i;
    antElement.style.backgroundImage = `url("ant.png")`;

    antElement.dataset.transform = `rotateZ(${getRotationAngle(this)}deg)`;
    antElement.style.transform = `rotateZ(${getRotationAngle(this)}deg)`;

    mainContainer.appendChild(antElement);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + ANT_SIZE >= mainContainer.offsetWidth || this.x < 0) {
      if (!this.retractingX) {
        this.dx *= -1;
      }

      this.retractingX = true;
    } else {
      this.retractingX = false;
    }

    if (this.y + ANT_SIZE >= mainContainer.offsetHeight || this.y < 0) {
      if (!this.retractingY) {
        this.dy *= -1;
      }
      this.retractingY = true;
    } else {
      this.retractingY = false;
    }

    const antElement = document.querySelector(".ant-" + this.i);

    if (antElement) {
      antElement.style.left = this.x + "px";
      antElement.style.top = this.y + "px";
      antElement.style.transform = `rotateZ(${getRotationAngle(this)}deg)`;
    }
  }

  checkCollision() {
    for (let i = 0; i < ants.length; i++) {
      const otherAnt = ants[i];
      if (
        otherAnt !== this &&
        !otherAnt.smashed &&
        !this.smashed &&
        this.isColliding(otherAnt)
      ) {
        this.handleCollision();
      }
    }
  }

  isColliding(otherAnt) {
    const dx = this.x - otherAnt.x;
    const dy = this.y - otherAnt.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= ANT_SIZE;
  }

  handleCollision() {
    if (!this.retractingX && !this.retractingY) {
      this.dx *= -1;
      this.dy *= -1;
    }
  }
}

const ants = [];
const NUM_ANTS = 20;
const ANT_SIZE = 40;
const MAX_SPEED = 5;
const MIN_SPEED = 3;

const mainContainer = document.querySelector(".container");

for (let i = 0; i < NUM_ANTS; i++) {
  const x = Math.random() * (mainContainer.offsetWidth - ANT_SIZE) + ANT_SIZE;
  const y = Math.random() * (mainContainer.offsetHeight - ANT_SIZE) + ANT_SIZE;

  const dx =
    (Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED) *
    (Math.random() < 0.5 ? -1 : 1);
  const dy =
    (Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED) *
    (Math.random() < 0.5 ? -1 : 1);

  const ant = new Ant(x, y, dx, dy, i);
  ants.push(ant);
  ant.draw();
}

function moveAnts() {
  for (let i = 0; i < ants.length; i++) {
    let ant = ants[i];
    const antElement = document.querySelector(".ant-" + i);
    if (antElement) {
      ant.move();
      antElement.style.left = ant.x + "px";
      antElement.style.top = ant.y + "px";
    }
  }
  for (let i = 0; i < ants.length; i++) {
    let ant = ants[i];
    ant.checkCollision();
  }
}

let score = 0;

function smashAnt(ant) {
  score++;
  document.querySelector(".score").innerText = `${score} / ${NUM_ANTS}`;
  ant.smashed = true;

  const antElement = document.querySelector(".ant-" + ant.i);
  antElement.remove();

  const bloodElement = document.createElement("div");
  bloodElement.classList.add("blood", "blood-" + ant.i);
  bloodElement.style.left = ant.x + "px";
  bloodElement.style.top = ant.y + "px";
  bloodElement.style.backgroundImage = `url("blood.png")`;
  mainContainer.appendChild(bloodElement);

  setTimeout(() => {
    bloodElement.remove();
  }, 1000);
}

mainContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement.dataset.index) {
    const antIndex = parseInt(clickedElement.dataset.index);
    const ant = ants[antIndex];
    smashAnt(ant);
  }
});

const playAgain = document.querySelector("button");
playAgain.addEventListener("click", function (event) {
  location.reload();
});

setInterval(moveAnts, 100);
