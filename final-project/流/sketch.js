let RESOLUTION = 10;
let angles = [];
let rows, cols;

let vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noCursor();
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

  for (let i = 0; i < 300; i++) {
    vehicles.push(new Vehicle(0, random(height/1.8,height/2.2)));
  }
}

function draw() {

  // flow field
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {

      let index = r + c * rows; // *** x + y * width

      let x = r * RESOLUTION;
      let y = c * RESOLUTION;

      let xfreq = (x + (frameCount+100)*0.1) * 0.01;
      let yfreq = (y + (frameCount+100)*0.1) * 0.01;
      let amp = TWO_PI; // range of angle
      let val = noise(xfreq, yfreq) * amp + frameCount*0.005;

      angles[index] = val;

      push();
      translate(x, y);

      // noFill();
      // stroke(200);
      // rect(0, 0, RESOLUTION, RESOLUTION);
      // text(index, 5, 15);

      // rotate(val);
      // stroke(200);
      // line(0, 0, RESOLUTION / 2, 0);

      pop();
    }
  }

  // vehicles
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];

    let r = floor(v.pos.x / RESOLUTION);
    let c = floor(v.pos.y / RESOLUTION);
    let index = r + c * rows;

    v.flow(angles[index]);
    v.update();
    // v.checkEdges();
    v.display();
  }
}


class Vehicle {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0;
    this.maxDesired = random(1,3);
    this.maxSteer = random(0.1,0.15);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  flow(angle) {
    let desired = p5.Vector.fromAngle(angle);
    desired.setMag(this.maxDesired);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteer);
    this.applyForce(steer);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    //noStroke();
    //fill(0);
    //triangle(0,0,-20,8,-20,-8);

    stroke(255,50);
    strokeWeight(1);
    point(0,0)
    pop();
  }
}
