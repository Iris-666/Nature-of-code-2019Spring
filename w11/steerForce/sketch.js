let vehicles = [];
let food;

function setup() {
  createCanvas(400, 400);
  background(50);

  food = new Food(random(width), random(height));
  for (let i=0; i<5; i++) {
    vehicles.push( new Vehicle(random(width), random(height)) );
  }
}

function draw() {
  background(50);

  food.display();

  for (let i=0; i<vehicles.length; i++) {
    let v = vehicles[i];
    //let mouseVec = createVector(mouseX, mouseY);
    //v.seekVec( mouseVec );

    //let centerVec = createVector(width/2, height/2);
    //let vec = p5.Vector.sub(mouseVec, centerVec);
    //v.flow( vec.heading() );

    v.seek( food );

    for (let j=0; j<vehicles.length; j++) {
      let otherV = vehicles[j];
      if (i != j) {
        v.avoid( otherV );
      }
    }

    v.update();
    v.display();
  }

  //stroke(255, 0, 0);
  //line(width/2, height/2, mouseX, mouseY);
}

function mousePressed() {
  food.pos = createVector( random(width), random(height) );
}




class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.rad = 10;
  }
  display() {
    push();
    stroke(255, 255, 0);
    fill(255, 255, 0, 100);
    ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);
    pop();
  }
}




class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = 0;

    this.maxSpeed = 5;    // max desired vel
    this.maxForce = 0.1;  // max steering force

    this.detectRad = 80;

    this.foldingVel = random(0.03, 0.08);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(f) {
    let force = f.copy();
    // no mass yet
    this.acc.add(force);
  }
  avoid( targetObj ) {
    let desiredVel = p5.Vector.sub(targetObj.pos, this.pos);
    let distance = desiredVel.mag();
    desiredVel.normalize();
    if(distance < this.detectRad) {
      let speed = map(distance, 0, this.detectRad, this.maxSpeed, 0);
      desiredVel.mult(speed * -1); // flip the vel
      let steerForce = p5.Vector.sub(desiredVel, this.vel);
      steerForce.limit(this.maxForce * 0.7); //***
      this.applyForce( steerForce );
    }
  }
  seek( targetObj ) {
    let desiredVel = p5.Vector.sub(targetObj.pos, this.pos);
    let distance = desiredVel.mag();

    desiredVel.normalize();
    if(distance > this.detectRad) {
      desiredVel.mult(this.maxSpeed);
    } else {
      let speed = map(distance, 0, this.detectRad, 0, this.maxSpeed);
      desiredVel.mult(speed);
    }

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxForce);
    this.applyForce( steerForce );
  }
  seekVec( target ) {
    let desiredVel = p5.Vector.sub(target, this.pos);
    let distance = desiredVel.mag();

    desiredVel.normalize();
    if(distance > this.detectRad) {
      desiredVel.mult(this.maxSpeed);
    } else {
      let speed = map(distance, 0, this.detectRad, 0, this.maxSpeed);
      desiredVel.mult(speed);
    }

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxForce);
    this.applyForce( steerForce );
  }
  flow( angle ) {
    let desiredVel = p5.Vector.fromAngle( angle );
    desiredVel.mult(this.maxSpeed);

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxForce);
    this.applyForce( steerForce );
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate( this.angle );
    noStroke();
    fill(255);

    let freq = frameCount * this.foldingVel;
    let amp = 5;
    let sinValue = sin(freq) * amp;

    triangle(0, 0, -15, sinValue, -15, -sinValue);
    stroke(0, 0, 255);
    noFill();
    ellipse(0, 0, this.brakeRad*2, this.brakeRad*2);
    pop();
  }
}

















// :D
