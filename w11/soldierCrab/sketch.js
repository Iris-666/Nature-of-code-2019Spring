const RESOLUTION = 40;
let rows, cols;
let angles = [];
let vehicles = [];
let trace = [];
let shells = [];
let num = 1;
let music;

function preload() {
  soundFormats('mp3', 'ogg');
  music = loadSound('wave.mp3');
}

function mousePressed(){
  music.play();

}

function setup() {
  let canvas1 = createCanvas(windowWidth, windowHeight);
  background(224,208,158);
  cols = ceil(width / RESOLUTION);
  rows = ceil(height / RESOLUTION);

  //I just create one crab because the frame rate would be too low if I creat more

  for (let i=0; i<num; i++) {
  shells.push(new Shell(random(100,width-100),random(height-200, height-10),random(2,4)))
}
// shell1 = new Shell(300,height-100,3)
// shell2 = new Shell(700,height-60, 2.5)


  for (let i=0; i<num; i++) {
    vehicles.push( new Vehicle(random(100,width-100), random(10,height/1.5), random(1,3)) );
  }
// crab1 = vehicles.push(new Vehicle(width/3,height/2, 2));
// crab2 =  vehicles.push(new Vehicle(width/2+100, height/1.8, 1.5));
}

function draw() {
  background(224,208,158);

  for (let i=0; i<shells.length; i++) {
    let s = shells[i];
    s.display();
  }

  // flow field
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {

      let index = r + c * rows; // *** x + y * width

      let x = c * RESOLUTION;
      let y = r * RESOLUTION;

      let freqX = x * 0.005 + (frameCount) * 0.005;
      let freqY = y * 0.005 + (frameCount) * 0.005;
      let amp = TWO_PI; // range of angle
      let angle = noise(freqX, freqY) * amp + frameCount*0.005;
      angles[index] = angle;

      // stroke(255);
      // fill(224,208,158);
      // rect(x, y, RESOLUTION, RESOLUTION);
      // push();
      // translate(x + RESOLUTION/2, y + RESOLUTION/2);
      // rotate(angle);
      // stroke(255);
      // line(0, 0, RESOLUTION/2, 0);
      // pop();
    }
  }

  // update and display the vehicles
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];

    let c = floor(v.pos.x / RESOLUTION);
    let r = floor(v.pos.y / RESOLUTION);
    let index = c + r * cols;

    v.flow( angles[index] );
    v.seek(shells[i])

    //draw the trace since I have to cover a new background every time, or there will be a log of crabs on the screen with the trace.
    trace.push(new Trace(v.pos.x, v.pos.y, v.size))
    for(let i=0;i<trace.length;i++){
      let t = trace[i];
      t.display();
    }
// console.log(frameRate());
    v.update();
    v.reappear();
    v.display();


  }
  push();
  translate(0,sin(frameCount*0.02)*50+60)

   wave(height - 100,  0.01, 2, 0.2);
pop();
}

function wave(yOffset, adjFreq, adjAmp, adjSize) {
  let freq; // time, angle (+ position)
  let amp; // radDistance

  for (let x = 0; x < width; x+= 1) {
    freq = x * 0.005 + frameCount * 0.02;
    amp = 40;
    sinForAmp = noise(freq) * amp * sin(freq);

    freq = frameCount * 0.01;
    amp = 10;
    sinForFreq = noise(freq) * amp;

    freq = x *adjFreq + frameCount * adjFreq;
    amp = (20 + sinForAmp) * adjAmp;
    let sinValue = sin(freq) * amp ;

    let y = yOffset + sinValue;

    stroke('#81C7D4');
    line(x,y,x,height);
  }
}
class Vehicle {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.size = size
    this.angle = 0;

    this.maxSpeed = 0.7;    // max desired vel
    this.maxForce = 0.2;  // max steering force

    this.detectRad = 80;

    // this.foldingVel = random(0.03, 0.08);
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
      desiredVel.mult(this.maxSpeed);

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
  reappear() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
    else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    // rotate( this.angle );
    noStroke();
    fill(210,197,151);


    // ellipse(0, 0, 10,10)
    // fill(196,184,143);
    // ellipse(1,1,10,10)
    rotate(0.7)
    stroke(0);
    scale(this.size)
    strokeWeight(1.5);
    noFill();
    ellipse(0,-11,7,10)
    fill(210,197,151);
    ellipse(0,-6,12,10)
    arc(0,0,13,13,-4.3,-0.3,CHORD)
    pop();
  }
}

class Trace {
  constructor(x,y,size){
    this.pos = createVector(x,y)
    this.size = size*8
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y)
    noStroke();
    fill(210,197,151);
    ellipse(0, 0, this.size,this.size)
    fill(196,184,143);
    ellipse(1,1,this.size,this.size)
    pop();

  }
}

class Shell {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(0.7)
    scale(this.size)
    stroke('#9E7A7A');
    strokeWeight(1.5);
    noFill();
    ellipse(0,-11,7,10)
    fill(224,208,158);
    ellipse(0,-6,12,10)
    arc(0,0,13,13,-4.3,-0.3,CHORD)
    pop();
  }
}












// :D
