let angle = 0;
// let c = 0.2;
let a = 70;
let b = 100;
let c = 0;
function setup() {
  frameRate(40);
  createCanvas(500, 500);
  angleMode(DEGREES);
}

function draw(){

  background(0);

  for (var angle = 0; angle < 360; angle += 72) {
    push();
    translate(width/2, height/2);
    rotate(angle);
    noFill();
    strokeWeight(5);
    rotate(frameCount);

    stroke(255,100,100,150);
    arc(60,60,a,a,245,365);
    stroke(100,100,205,150);
    arc(60,-60,a,a,0,110);
    ellipse(0,0,3,3)
    stroke(200,220,220,150);
    arc(60,60,b,b,245,365);
    arc(60,-60,b,b,0,120)
    console.log('frameCount = '+frameCount);
    c += 1
    console.log('c = '+c);

    if(frameCount > 100){
      a = frameCount-30;
      b = frameCount;
    }

    if (frameCount > 500){
      a = 470;
      b = 500;
    }



    pop();

  }
}
