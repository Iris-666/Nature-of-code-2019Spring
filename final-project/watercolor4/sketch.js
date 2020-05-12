let RESOLUTION = 50;
let angles = [];
let rows, cols;
let dots = [];
let noiseDots = []


function setup(){
  createCanvas(600,600)
  background(0);
  // blendMode(ADD);
  angleMode(DEGREES);

  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

for(let i=0;i<10;i++){
  dots.push(new Dots(sin(36*i)*10 + width/2,cos(36*i)*10 + height/2))
}

for(let i=0;i<dots.length;i++){
  let d = dots[i];
  for(let j=0;j<5;j++){
    noiseDots.push(new Noisedots(d))
  }
}


}

function draw(){
  // background(0);

  for (let c = 0; c < cols; c++) {
  for (let r = 0; r < rows; r++) {

    let index = r + c * rows; // *** x + y * width

    let x = r * RESOLUTION;
    let y = c * RESOLUTION;

    let freqX = x * 0.001 + frameCount * 0.001;
    let freqY = y * 0.001 + frameCount * 0.001;
    let noiseValue = noise(freqX, freqY); // range 0 to 1
    let angleFlowField = map(noiseValue, 0, 1, 0, TWO_PI);

    let sinValue = sin(frameCount * 0.01) * PI/6;
    let vector = createVector(width/2 - x, height/2 - y);
    let angleMouse = vector.rotate(PI/2 + sinValue).heading();

    let angle = angleFlowField * 0.0 + angleMouse * 1.0;

    angles[index] = angle;

    stroke(255);
    fill(0);
    rect(x, y, RESOLUTION, RESOLUTION);
    push();
    translate(x + RESOLUTION/2, y + RESOLUTION/2);
    rotate(angle);
    stroke(255);
    line(0, 0, RESOLUTION/2, 0);
    pop();
  }
}

for(let i=0;i<dots.length;i++){
  let d = dots[i];

  let r = floor(d.pos.x / RESOLUTION);
let c = floor(d.pos.y / RESOLUTION);
let index = r + c * rows;


  let forceX = map(noise((frameCount+100)*0.1),0,1,-0.5,0.5)
  let forceY = map(noise(frameCount*0.1),0,1,-0.5,0.5)
  f = createVector(forceX,forceY)
  angleForce = p5.Vector.fromAngle(angles[index])
  angleForce.mult(0.05)
  // d.applyForce(f)
  d.applyForce(angleForce)

  // d.flow(angles[index]);
  d.update();
  d.checkEdges();
  d.display();

}

// for(let i=0;i<noiseDots.length;i++){
//   noiseDots[i].display();
// }
fill(255,1);
// noFill();
noStroke();
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
