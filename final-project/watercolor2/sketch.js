let RESOLUTION = 50;
let angles = [];
let rows, cols;
let dots = [];
const C_WALL = 0.95;
const C_FLOOR = 1.02;


function setup(){
  createCanvas(600,600)
  background(0);
  // blendMode(ADD);

  rows = ceil(width / RESOLUTION);
cols = ceil(height / RESOLUTION);

// for(let i=0;i<10;i++){
//   dots.push(new Dots(random(100,500),random(100,500)))
// }

}

function draw(){
  // background(0);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {

      let x = c * RESOLUTION;
      let y = r * RESOLUTION;

      let freqX = x * 0.001 + frameCount * 0.001;
      let freqY = y * 0.001 + frameCount * 0.001;
      let noiseValue = noise(freqX, freqY); // range 0 to 1
      let angleFlowField = map(noiseValue, 0, 1, 0, TWO_PI);

      let sinValue = sin(frameCount * 0.01) * PI/6;
      let vector = createVector(mouseX - x, mouseY - y);
      let angleMouse = vector.rotate(PI/2 + sinValue).heading();

      let index = c + r * cols;
      //let index = x + y * width;
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

// for(let i=0;i<dots.length;i++){
//   let d = dots[i];
//
//   let r = floor(d.pos.x / RESOLUTION);
// let c = floor(d.pos.y / RESOLUTION);
// let index = r + c * rows;
//
//
//   let forceX = map(noise((frameCount+100)*0.1),0,1,-0.5,0.5)
//   let forceY = map(noise(frameCount*0.1),0,1,-0.5,0.5)
//   f = createVector(forceX,forceY)
//   // d.applyForce(f)
//   d.flow(angles[index]);
//   d.update();
//   d.checkEdges();
//   // d.display();
// }
// fill(255,1);
// noStroke();
// beginShape();
// for(let i=0;i<dots.length;i++){
//   curveVertex(dots[i].pos.x,dots[i].pos.y)
// }
// endShape();
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
    this.vel.mult( C_WALL );
  }
  else if (this.pos.x > width) {
    this.pos.x = width;
    this.vel.x *= -1;
    this.vel.mult( C_WALL );
  }
  // floor
  if (this.pos.y > height) {
    this.pos.y = height;
    this.vel.y *= -1;
    this.vel.mult( C_FLOOR );
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
