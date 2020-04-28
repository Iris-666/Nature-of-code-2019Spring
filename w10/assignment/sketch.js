let particles1 = [];
let particles2 = [];
let particles3 = [];
let particles4 = [];

let pSystems = [];
let mouseClick = 0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  angleMode(DEGREES);
  rectMode(CENTER);

  // pSystems.push( new ParticleSystem(10,200,10,0.5));
  // pSystems.push( new GlowingSystem(10,400,50,-0.1));
  // pSystems.push( new TriSystem(10,300,50,-0.1));
  // pSystems.push( new TriSystem(10,50,50,-0.1));
  // pSystems.push( new RectSystem(10,50,200,-0.1));

  for(let i = 0; i < 360; i+=30){
    particles1.push(new Particle(i,100,10,0.5))
    }
  for(let i = 0; i < 360; i+=10){
    particles2.push(new TriShape(i,50,100,0.5))
    }
  for(let i = 0; i < 360; i+=10){
    particles3.push(new TriShape(i,800,50,0.5))
    }
  for(let i = 0; i < 360; i+=10){
    particles4.push(new RectShape(i,500,50,-0.1))
    }
// console.log(particles);

  // for(let i = 0;i<pSystems.length;i++){
  //   let ps = pSystems[i];
  //   ps.generate();
  //   // pSystems[0].generate()
  // }
}

function mouseClicked(){
  mouseClick += 1;
  console.log(pSystems);
  // console.log(mouseClick);
}

function draw(){
  background(0);

//   for(let i = 0;i<pSystems.length;i++){
//     let ps = pSystems[mouseClick];
//     console.log(mouseClick);
//     ps.display();
// }
// pSystems[4].expand();
push();
translate(width/2,height/2)
for(let i = 0;i<particles1.length;i++){
  let p = particles1[i];
  p.update();
  p.display();
}
for(let i = 0;i<particles2.length;i++){
  let p = particles2[i];
  p.update();
  p.display();
}
for(let i = 0;i<particles3.length;i++){
  let p = particles3[i];
  p.update();
  p.display();
}
for(let i = 0;i<particles4.length;i++){
  let p = particles4[i];
  p.update();
  p.display();
}

pop();

}

class Particle{
  constructor(angle,rad,m,spd){
    this.angle = angle;
    this.rad = rad;
    this.mass = m;
    this.spd = spd;
    this.pos = new p5.Vector.fromAngle(radians(this.angle), rad);
    this.vel = new p5.Vector();
    this.acc = new p5.Vector();

  }
  update(){
    this.angle = this.angle + this.spd;
    this.pos = p5.Vector.fromAngle(radians(this.angle), this.rad);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    fill(255);
    ellipse(0,0,this.mass,this.mass);
    // text(this.angle,10,10)
    pop();
  }
}

class Glowing extends Particle{
  constructor(angle,rad,m,spd){
    super(angle,rad,m,spd);
  }
  display(){
    let opa1 = 255;
    for(let r = 0; r<this.mass; r+=1){
      let colorR = map(r,0,20,255,102);
      let colorG = map(r,0,20,255,186);
      let colorB = map(r,0,20,255,183);
      noFill();
      strokeWeight(1);
      stroke(colorR,colorG,colorB,opa1)
      ellipse(this.pos.x, this.pos.y, r,r);
      opa1 -= 9;
    }
  }
}

class TriShape extends Particle {
  constructor(angle,rad,m,spd){
    super(angle,rad,m,spd);

  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255)
    // fill(255)
    rotate(this.angle)
    triangle(10, 0, -10, 53, -10, -53);
    pop();
  }

}

class RectShape extends Particle {
  constructor(angle,rad,m,spd){
    super(angle,rad,m,spd);

  }
  expand(){
    this.mass += 1;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255)
    // fill(255)
    rotate(this.angle)
    rect(0,0,this.mass,this.mass)
    pop();
  }

}


class ParticleSystem{
  constructor(freq,rad,m,spd){
    this.freq = freq;
    this.rad = rad;
    this.mass = m;
    this.spd = spd;
  }
  generate(){
    for(let i = 0; i < 360; i+=this.freq){
      particles.push(new Particle(i,this.rad,this.mass,this.spd))
      }
  }
  display(){
  push();
  translate(width/2,height/2)
  for(let i = 0; i < particles.length; i++){
    let p = particles[i];
    p.update();
    p.display();
  }
  pop();
}
}

class GlowingSystem extends ParticleSystem{
  generate(){
    for(let i = 0; i < 360; i+=this.freq){
      particles.push(new Glowing(i,this.rad,this.mass,this.spd))
      }
  }
}

class TriSystem extends ParticleSystem{
  generate(){
    for(let i = 0; i < 360; i+=this.freq){
      particles.push(new TriShape(i,this.rad,this.mass,this.spd))
      }
  }
}

class RectSystem extends ParticleSystem{
  expand(){
    for(let i = 0; i < particles.length; i++){
      let p = particles[i];
      p.mass += 1;
    }

  }
  generate(){
    for(let i = 0; i < 360; i+=this.freq){
      particles.push(new RectShape(i,this.rad,this.mass,this.spd))
      }
  }
}
