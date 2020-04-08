let angle = 0;
function setup() {
  createCanvas(500, 500);
  background(0);
  angleMode(DEGREES);
}

function draw(){

  for (var angle = 0; angle < 360; angle += 72) {
    push();
    translate(width/2, height/2);
    rotate(angle);
    noFill();
    strokeWeight(5);
    stroke(255,100,100,50);
    arc(60,60,70,70,245,365);
    stroke(100,100,205,50);
    arc(60,-60,70,70,0,110);
    ellipse(0,0,3,3)
    // stroke(200,220,220,50);
    // arc(60,60,100,100,245,365);
    // arc(60,-60,100,100,0,120)
    scale(1.5);
    stroke(100,100,205,50);
    arc(60,60,70,70,245,365);
    stroke(255,100,100,50);
    arc(60,-60,70,70,0,110);
    scale(0.4);
    stroke(100,100,205,50);
    arc(60,60,70,70,245,365);
    stroke(255,100,100,50);
    arc(60,-60,70,70,0,110);

    pop();

  }
}
