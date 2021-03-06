let limit = 200,
  counter = 0;

let goal = {};

let bubbles = [];

let mPool = [];

let maxDist;

function setup() {
  createCanvas(600, 400);
  goal = {
    x: width - 80,
    y: height / 2,
    r: 40
  };
  maxDist = dist(goal.x, goal.y, 0, 0);
  for (let i = 0; i < 15; i++) {
    let tempLS = [];
    for (let i = 0; i < limit; i++) {
      tempLS.push(random(TWO_PI));
    }
    bubbles.push(new Bubble(30, height / 2, tempLS));
  }
}

function draw() {
  background(0);

  counter++;
  if (counter > limit) {
    counter = 1;
  }
  fill(255);
  textSize(15);
  text(`Tick: ${counter}/${limit}`, 10, 20);

  for (let i = 0; i < bubbles.length; i++) {
    if (counter == 1) {
      bubbles[i].x = 30;
      bubbles[i].y = height / 2;
    } else {
      bubbles[i].update();
      bubbles[i].show();
    }
  }

  fill(0, 255, 0, 70);
  stroke(0, 255, 0, 150);
  circle(goal.x, goal.y, goal.r);

  if (counter == limit) {
    mPool = [];
    for (let i = 0; i < bubbles.length; i++) {
      let temp = dist(bubbles[i].x, bubbles[i].y, goal.x, goal.y);
      for (let j = 0; j < map(temp, 0, maxDist, 50, 0); j++) {
        mPool.push(bubbles[i].dirs);
      }
    }

    for (let i = 0; i < bubbles.length; i++) {
      let parent1 = mPool[floor(random(mPool.length - 1))];
      let parent2 = mPool[floor(random(mPool.length - 1))];
      for (let j = 0; j < bubbles[i].dirs.length; j++) {
        bubbles[i].dirs[j] = lerp(parent1[j], parent2[j], random(1));
      }
    }
  }
}
