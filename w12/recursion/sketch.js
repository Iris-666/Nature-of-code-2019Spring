function setup() {
  createCanvas(600, 800);
  background(255);
  noFill();
  drawCircle(width/2, height/2, 500);
}

function draw() {
  noLoop();
}

function drawCircle(x, y, d) {
  ellipse(x, y, d, d);

  // recursion
  if (d > 100) {
    d = d * 2/4;
    drawCircle(x + d/2, y, d);
    drawCircle(x - d/2, y, d);
    drawCircle(x, y + d/2, d);
    drawCircle(x, y - d/2, d);
  }
}












// :D
