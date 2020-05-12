let RESOLUTION = 50;
let angles = [];
let rows, cols;
let dots = [];
let noiseDots = []

function setup(){
  createCanvas(600,600)
  background(0);
  angleMode(DEGREES);

  for(let i=0;i<10;i++){
    dots.push(new Dots(sin(36*i)*10 + width/2,cos(36*i)*10 + height/2))
  }

}

function draw(){
  background(0);
  for(let i=0;i<dots.length;i++){
    let d = dots[i];

    angleForce = createVector(sin(36*i)*random(0,0.01),cos(36*i)*random(0,0.01))
    d.applyForce(angleForce);
    d.update();

    d.display();
  }
  stroke(255);
  noFill();
  // noStroke();
  beginShape();

  for(let i=0;i<dots.length;i++){
    curveVertex(dots[i].pos.x,dots[i].pos.y)
  }
  endShape();

}


class Dots{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxDesired = random(1,3);
this.maxSteer = random(0.1,0.15);

  }
  applyForce (f) {
    let force = f.copy();
    this.acc.add(force);
  }
  flow(angle) {
  let desired = p5.Vector.fromAngle(angle);
  desired.setMag(this.maxDesired);
  let steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxSteer);
  this.applyForce(steer);
}
// checkEdges() {
//   if (this.pos.x < 0) {
//     this.pos.x = width;
//   } else if (this.pos.x > width) {
//     this.pos.x = 0;
//   }
//   if (this.pos.y < 0) {
//     this.pos.y = height;
//   } else if (this.pos.y > height) {
//     this.pos.y = 0;
//   }
// }
checkEdges() {
  // wall
  if (this.pos.x < 0) {
    this.pos.x = 0;
    this.vel.x *= -1;
  }
  else if (this.pos.x > width) {
    this.pos.x = width;
    this.vel.x *= -1;
  }
  // floor
  if (this.pos.y > height) {
    this.pos.y = height;
    this.vel.y *= -1;
  }
  if (this.pos.y < 0) {
    this.pos.y = 0;
    this.vel.y *= -1;
  }

}
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.98);
    this.vel.limit(10);
    this.acc.mult(0);
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    fill(255);
    noStroke();
    ellipse(0, 0, 10, 10)
    pop();
  }
}

class Noisedots{
  constructor(dot){
    this.pos = createVector(dot.pos.x + random(-5,5),dot.pos.y + random(-5,5));
    // console.log(dot);

  }
  display(){

     push();
      translate(this.pos.x,this.pos.y);
      fill(255);
      noStroke();
      ellipse(0, 0, 5, 5)
      pop();

}

}
