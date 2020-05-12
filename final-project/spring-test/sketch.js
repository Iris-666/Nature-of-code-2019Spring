let s1, s2;
let gravity;
let mass = 2.0;
let balls = [];
let spring = [];
let lowerballs = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
   gravity = createVector(0,9);

let w = 100;
let h = 100;
let hlow
for(let i = 0;i<10;i++){
  balls.push(new Ball(w,h));
  hlow = 200;
  for(let a=0;a<3;a++){
    lowerballs.push(new Ball(w,hlow))
    hlow+= 100;
  }
  w+=100;

}

console.log(lowerballs);



for (let i = 0; i < balls.length; i++) {
  if (i < balls.length - 1) {
    spring.push(new Spring(balls[i], balls[i + 1], 90));
  }

}

for(let i=0; i<lowerballs.length;i++){
  if(i%3 != 0){
    spring.push(new Spring(lowerballs[i-1], lowerballs[i], 90));
  }
  if(i%3 == 0){
    spring.push(new Spring(lowerballs[i], balls[i/3], 90));
  }
}

  // s1 = new Spring2D(0.0, width / 2, mass, gravity);
  // s2 = new Spring2D(0.0, width / 2, mass, gravity);
}


function draw(){
  background(0);

  for (let i = 0; i < spring.length; i++) {
    spring[i].update();
    spring[i].display();
  }

  for (let i = 0; i < balls.length; i++) {
    // balls[i].applyForce(gravity);

    // balls[i].update();
    // balls[i].drag();
    balls[i].display();
  }


  for (let i = 0; i < lowerballs.length; i++) {
    lowerballs[i].applyForce(gravity);

    lowerballs[i].update();
    lowerballs[i].drag();
    lowerballs[i].display();
  }

 //  s1.update(mouseX, mouseY);
 // s1.display(mouseX, mouseY);
 // s2.update(s1.x, s1.y);
 // s2.display(s1.x, s1.y);
}


class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.mass = 1;
    this.rad = 30;

    this.damping = 0.5;
  }
  display() {
    push();
    stroke(255);
    strokeWeight(2);
    fill(200);
    ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    pop();
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    // damping
    this.vel.mult(this.damping);
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  drag() {
    let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (mouseIsPressed && distance < this.rad) {
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }
}

class Spring {
  constructor(ballA, ballB, len) {
    this.ballA = ballA;
    this.ballB = ballB;
    this.len = len;
    this.k = 0.1;
  }
  display() {
    push();
    stroke(255);
    line(this.ballA.pos.x, this.ballA.pos.y, this.ballB.pos.x, this.ballB.pos.y);
    pop();
  }
  update() {
    let vector = p5.Vector.sub(this.ballA.pos, this.ballB.pos);
    let distance = vector.mag();
    let direction = vector.copy().normalize();
    let stretch = distance - this.len;

    // hooke's law
    let force = direction.copy();
    force.mult(-1 * this.k * stretch);
    this.ballA.applyForce(force);
    force.mult(-1);
    this.ballB.applyForce(force);
  }
}
