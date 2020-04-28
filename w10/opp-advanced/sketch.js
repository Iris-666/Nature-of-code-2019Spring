let particles = [];

function setup() {
  createCanvas(400, 400);
  background(50);


}

function draw() {
  background(50);

  // genetate
  // let p = new Particle( new p5.Vector(width/2, height/2) );
  let p;
  if (random(1) < 0.5) {
    p = new RectShape( new p5.Vector(width/2, height/2), color(200, 255, 10) );
  } else {
    p = new TriShape( new p5.Vector(width/2, height/2), color(200, 0, 100) );
  }


  p.setVelocity( new p5.Vector(random(-3,3),random(-3,3)) );
  particles.push( p );

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.speedUp();
    p.slowDown();
    p.updateRotation();
    p.update();
    p.display();

    // or use this :D
    // p.run();
  }

  // limit the number of the particles
  while (p.length > 500) {
    particles.splice(0, 1);
  }
}




class Particle {
  constructor(_pos) {
    this.pos = _pos.copy();
    this.vel = new p5.Vector();
    this.acc = new p5.Vector();
    this.mass = random(2, 5);
    this.rad = this.mass;
  }
  setVelocity( _vel ) {
    this.vel = _vel.copy();
    return this; // ***
  }
  update() {
    // pos
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    // size
    this.rad = this.mass;
  }

  // ***
  updateRotation() {}
  slowDown() {}
  speedUp() {}

  display() {
    push();
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);
    pop();
  }
  run() {
    this.update();
    this.display();
  }
}

class TriShape extends Particle {
  constructor(_pos, _color) {
    super(_pos); // call the superclass' constructor!
    this.clr = _color;
    this.angle = 0;
    this.angleVel = random(-0.05, 0.05);
  }
  updateRotation() {
    this.angle += this.angleVel;
  }
  speedUp() {
    this.vel.mult(1.02);
  }
  // this overrides the superclass display function - polymorphism!
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(this.clr);
    noStroke();
    triangle(10, 0, -10, 7, -10, -7);
    pop();
  }
  run() {
    this.updateRotation();
    this.speedUp();
    this.update();
    this.display();
  }
}

class RectShape extends Particle {
  constructor(_pos, _color) {
    super(_pos); // call the superclass' constructor!
    this.clr = _color;
    this.angle = 0;
    this.angleVel = random(-0.05, 0.05);
  }
  slowDown() {
    this.vel.mult(0.98);
  }
  updateRotation() {
    this.angle += this.angleVel;
  }
  // this overrides the superclass display function - polymorphism!
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(this.clr);
    noStroke();
    rect(0, 0, this.rad*2, this.rad*2);
    pop();
  }
  run() {
    this.updateRotation();
    this.slowDown();
    this.update();
    this.display();
  }
}





























// :D
