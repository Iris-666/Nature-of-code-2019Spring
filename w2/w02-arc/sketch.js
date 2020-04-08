function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  background(0);
  noFill();
  stroke(120);
  strokeWeight(1);
  ellipse(width/2, height/2, 200, 200);

  stroke(255);
  strokeWeight(5)
  arc(width/2, height/2, 200, 200, PI*0,2, PI*1.8);


}
