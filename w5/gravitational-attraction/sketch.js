let p1, p2;

const C_GRAVITY = 1;

function setup(){
  createCanvas(600,600)
  background(220);

  p1 = new Particle(100,100, 5);
  p2 = new Particle(250,250, 20);

}

function draw(){
  background(50);

  let mousePos = createVector(mouseX, mouseY);
  let centerPos = createVector(width/2, height/2)

  // p1.attractTo( mousePos);
  p1.applyGAttraction(p2);
  p1.update();
  p1.display();

  p2.update();
  p2.display();

}



class Particle {
  constructor(x, y, m){
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = m;
    this.rad = m;
  }

  attractTo(target){
    let f = p5.Vector.sub(target, this.pos);
    // f.normalize();
    f.mult(0.05);
    this.applyForce(f);
  }

  applyGAttraction(other){
    let f = p5.Vector.sub(other.pos, this.pos);
    let distance = f.mag();
    let gMag = (C_GRAVITY * other.mass * this.mass) / (distance * distance)
    f.normalize();//direction
    f.mult(gMag);
    this.applyForce( f );

  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.vel.mult(0.98)
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force)
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255)
    fill(255, 150);
    ellipse(0, 0, this.rad*2, this.rad*2);
    pop();
  }
}
