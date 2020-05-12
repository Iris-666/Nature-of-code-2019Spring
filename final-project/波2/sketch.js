let ripple
let inkdrops = [];

let params = {
  rate: 1.5,
  size: 10,
  noisy: 0.5
}

// window.onload = () => {
//   let gui = new dat.GUI();
//   gui.add(params, "rate", 0, 3);
//   gui.add(params, "size", 0, 200);
//   gui.add(params, "noisy", 0, 1)
// }

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  noCursor();

}

// function mousePressed(){
//   ripple = new Ripple(mouseX,mouseY);
// }
function draw(){
  background(0);

  if(ripple != null){
  ripple.update();
  ripple.display();
}


for (let i = 0; i < inkdrops.length; i++) {
    let a = inkdrops[i];
    a.update();
    a.display();
    for(let j=0;j<a.rims.length;j++){
      // a.rims[j].display()
      // console.log(a.rims[j].pos.x);
    }

  }
  for (let i = inkdrops.length - 1; i >= 0; i--) {
    let a = inkdrops[i];
    if (a.lifespan <= 0.1) {
      inkdrops.splice(i, 1);
    }
  }
}

function mousePressed() {
  inkdrops.push( new InkDrop(width/2, height/2, random(360)) );
}

class InkDrop {
  constructor(x,y,hue){
    this.pos = createVector(x,y);
    this.hue = hue;
    this.rims = [];
    // this.newRims = [];
    this.newRims = new Array(10).fill(0).map(n => new Array(10).fill(0));
    this.springs = [];
    this.phase = random(1000);
    this.lifespan = 1;
    for (let i = 0; i < 10; i++) {
      let mag = params.size * (1 - params.noisy) + params.size * params.noisy * noise(i + this.phase);
      let angle = radians(36 * i);
      this.rims.push(new Dots(angle, mag));
    }
    for (let i = 0; i < this.rims.length; i++) {


      if (i == 0) {
        this.springs.push ( new Spring(this.rims[0], this.rims[this.rims.length - 1]));
      }else{
        this.springs.push( new Spring(this.rims[i], this.rims[i - 1]));
      }
    }
  }
  update(){
    push();
    translate(this.pos.x, this.pos.y);
    for (let i = 0; i < this.springs.length; i++) {
      this.springs[i].spring();
    }
    for (let i = 0; i < this.rims.length; i++) {
      this.rims[i].update();
    }
    pop();
    this.lifespan -= 0.0013;
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    // fill(255,this.lifespan*100);
    // noStroke();
    // console.log(this.rims[0].pos.x, this.rims[0].pos.y);

    for( let r=0; r<10; r++){
    for (let i = 0; i < this.rims.length; i++) {
      let p = this.rims[i]
      let pdist = dist(p.pos.x, p.pos.y, 0, 0)
      console.log(pdist);
      let c = map(r,0,10,1,3)
      this.newRims[r][i] = createVector(p.pos.x - (p.pos.x/pdist)*r*c,p.pos.y - (p.pos.y/pdist)*r*c)
    }
  }

  stroke(255,200);
  strokeWeight(2)
  noFill();

    beginShape();
    curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
    for (let i = 0; i < this.rims.length; i++) {
      curveVertex(this.rims[i].pos.x, this.rims[i].pos.y);
    }
    curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
    curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
    endShape();

    for( let r=0; r<10; r++){
    stroke(255,map(r,0,10,200,0))
    strokeWeight(map(r,0,10,2,10))
    beginShape();
    curveVertex(this.newRims[r][0].x, this.newRims[r][0].y);
    for (let i = 0; i < this.newRims[r].length; i++) {
      curveVertex(this.newRims[r][i].x, this.newRims[r][i].y);
    }
    curveVertex(this.newRims[r][0].x, this.newRims[r][0].y);
    curveVertex(this.newRims[r][0].x, this.newRims[r][0].y);
    endShape();
}
    pop();
  }
}


class Dots{
  constructor(angle, mag){
    this.pos = p5.Vector.fromAngle(angle, mag);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
  }
  applyForce (f) {
    let force = f.copy();
    this.acc.add(force);
  }
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  display(){
    push();
    translate(this.pos.x+width/2,this.pos.y+height/2);
    fill(255)

    ellipse(0, 0, 10, 10)
    pop();
  }
}

class Spring {
  constructor(dot1, dot2) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.pos1 = dot1.pos;
    this.pos2 = dot2.pos;
    // this.len = dist(dot1.x, dot1.y, dot2.x, dot2.y);
    this.len = 1;
  }
  spring(){
    // stroke(0,255,8);
    // line(this.pos1.x, this.pos1.y, 0, 0);
    // let vector = p5.Vector.sub(this.pos1, this.pos2);
    let centerVec = createVector(0, 0)
    let vector = p5.Vector.sub(this.pos1, centerVec);
    let distance = vector.mag();
    let heading = vector.copy().normalize();

    let stretch = map(distance,0,1000,10,0.5);
    let force = heading.copy();

    force.mult(-1* params.rate * random(0.001,0.002) * stretch);
    this.dot1.applyForce(force);
    force.mult(-1);
    this.dot2.applyForce(force);
  }
}

class Ripple{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.r = 0;
  }
  update(){
    this.r += 1;
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    for(let i = 0;i<200;i+=5){
      stroke(i)
      noFill();
      ellipse(0, 0, this.r+i/5,this.r+i/5)
    }
    // stroke(255);
    // noFill();
    // ellipse(0, 0, this.r, this.r)
    pop();
  }
}
