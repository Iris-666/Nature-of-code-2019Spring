let balls = [];
// let b;

function setup() {
  createCanvas(400, 500);
  background(220);

  for (let i = 0; i < 10; i ++){
    balls[i] = new Ball();
  }
  // b = new Ball();
}


function draw() {
  background(220);

for(let i = 0; i < balls.length; i ++ ){
  balls[i].display();
  balls[i].move();
  balls[i].bounce();
}
}


// ES6 model
class Ball {
  constructor() {
    // properties, field == variables
    this.x = width/2;
    this.y = height/2;
    this.size = 30;
    this.xSpd = random(-5, 5);
    this.ySpd = random(-5, 5);
  }
  // methods == functions
  move(){
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  bounce(){
    if (this.x > width || this.x < 0){
      this.xSpd = -this.xSpd;
    }
    if (this.y > height || this.y < 0){
      this.ySpd = -this.ySpd;
    }


  }
  display() {
    ellipse(this.x, this.y, this.size, this.size);
  }
}

















//




//
