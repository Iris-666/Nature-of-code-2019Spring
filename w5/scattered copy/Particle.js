"use strict";

class Particle {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), 0);
    this.acc = createVector(0, 0);
    if (m < 1 || m == undefined) m = 1;
    this.mass = m;
    this.rad = m;
    this.isDone = false;
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add( force );
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.vel.mult(0.99);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, this.rad * 2, this.rad * 2);
    pop();
  }
  checkBoundaries() {
    // x
    let state = false;
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;

      this.isDone = true;
      if (this.mass > 3) {
        // if it's big enough we let it scattered!
        state = true;
      }
    }
    return state;
  }
}
