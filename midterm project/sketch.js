let planetParticles1 = [];
let planetParticles2 = [];
let planetParticles3 = [];
let planetParticles4 = [];
let s;
let s2;
let tails = [];
const C_GRAVITY = 1;
let canvasWidth, canvasHeight;
let offsetX, offetY;

const C_RESISTANCE = 0.005;

function setup(){
  // var cnv = createCanvas(windowWidth,windowHeight);
  // cnv.id('mycanvas')

  createCanvas(windowWidth, windowHeight);

  canvasWidth = windowWidth;
  canvasHeight = 10000;

  offsetX = 0;
  offsetY = 8422;

  background(0);
  s = new Star(1700,9000);
  s2 = new Star(700,9000);

  // ellipseMode(RADIUS);
  for(i=0;i<40;i++){
    planetParticles1.push(new Planet(random(200,400),random(200,400),random(10,15),255,255,255,1))
  }
  for(i=0;i<50;i++){
    planetParticles2.push(new Planet(random(700,900),random(700,900),random(15,20),102,186,183,1))
  }
  for(i=0;i<50;i++){
    planetParticles3.push(new Planet(random(1400,1600),random(400,600),random(12,16),139,129,195,1))
  }
  for(i=0;i<50;i++){
    planetParticles4.push(new Planet(random(1250,1350),random(1050,1150),random(7,11),217,205,144,0.7))
  }


}

function draw(){
  background(0);

  //star

  updateNavigation();

  translate(-offsetX, -offsetY);
  console.log(offsetX, offsetY);

  for(i = 0; i<10000;i+=100){
    ellipse(300,i,10,10)
  }

  let spdVectorLeft = createVector(-1,0)
  let spdVectorRight = createVector(1,0)

  if (keyIsDown(LEFT_ARROW)) {
    s.applyForce(spdVectorLeft)
  } else if (keyIsDown(RIGHT_ARROW)) {
    s.applyForce(spdVectorRight)
  }

  if (keyIsDown(65)) {
    s2.applyForce(spdVectorLeft)
  } else if (keyIsDown(68)) {
    s2.applyForce(spdVectorRight)
  }

  let resistance = p5.Vector.mult(s.vel,-1);
  resistance.normalize();//direction
  let speed = s.vel.mag();
  let magnitude = speed * speed * C_RESISTANCE;
  resistance.mult(magnitude);
  s.applyForce(resistance);


  let resistance2 = p5.Vector.mult(s2.vel,-1);
  resistance2.normalize();//direction
  let speed2 = s2.vel.mag();
  let magnitude2 = speed2 * speed2 * C_RESISTANCE;
  resistance2.mult(magnitude2);
  s2.applyForce(resistance2);

  let distanceStars = p5.Vector.sub(s.pos,s2.pos);
  distanceStars = distanceStars.mag();
  if(distanceStars > 200 ){
    let gravity1 = createVector(0,0.1);
    let gravity2 = createVector(0,0.1);
    s.applyForce(gravity1);
    s2.applyForce(gravity2);
  }
  if(distanceStars<= 200){
    let upForce = createVector(0,-0.1);
    s.applyForce(upForce);
    s2.applyForce(upForce);
  }


//apply the attraction of the planets
  let planet1 = createVector(300,300);
  let attraction1 = p5.Vector.sub(planet1,s.pos)
  let distance1 = attraction1.mag();
  if(distance1<300){
  attraction1.mult(0.01)
  s.applyForce(attraction1);
  // s2.applyForce(attraction1);

}

  let planet2 = createVector(800,800);
  let attraction2 = p5.Vector.sub(planet2,s.pos)
  let distance2 = attraction2.mag();
  if(distance2<350){
  attraction2.mult(0.012)
  s.applyForce(attraction2);
  // s2.applyForce(attraction2);

}

  let planet3 = createVector(1500,500);
  let attraction3 = p5.Vector.sub(planet3,s.pos)
  let distance3 = attraction3.mag();
  if(distance3<350){
  attraction3.mult(0.01)
  s.applyForce(attraction3);
  // s2.applyForce(attraction3);

}

  let planet4 = createVector(1300,1100);
  let attraction4 = p5.Vector.sub(planet4,s.pos)
  let distance4 = attraction4.mag();
  if(distance4<250){
  attraction4.mult(0.01)
  s.applyForce(attraction4)
  // s2.applyForce(attraction4)

}


  // s.checkCollision(s2)
  s.checkBoundaries();
  s.update();
  s.display();

  s2.checkBoundaries();
  s2.update();
  s2.display();


  tails.push(new Tail(s.pos.x,s.pos.y))
  for(i=0;i<tails.length;i++){
    let t = tails[i];
    t.update();
    t.display();

    if(t.isDone == true){
      tails.splice(i,1);
    }
  }



//planets

  let opa = 205;
  for(r=300;r>0;r-= 1){
    noFill();
    stroke(255,opa);
    if(distance1<175){
      stroke(255,opa+50)
    }
    ellipse(300,300,r,r);
    stroke(102,186,183,opa)
    if(distance2<200){
      stroke(207,238,234,opa+50)
    }
    ellipse(800,800,r+100,r+100)
    stroke(139,129,195,opa);
    if(distance3<200){
      stroke(182,177,212,opa+50)
    }
    ellipse(1500,500,r+50,r+50);
    stroke(217,205,144,opa)
    if(distance4<200){
      stroke(242,232,181,opa+50)
    }
    ellipse(1300,1100,r-50,r-50);

    opa -= 4;
  }

//planet1
  // for( i = 0; i<planetParticles1.length; i++){
  //   let p = planetParticles1[i];
  //   s.checkCollision(p,0.2);
  //   for (let b=0; b<planetParticles1.length; b++) {
  //     let other = planetParticles1[b];
  //     if (i != b) {
  //       p.checkCollision( other );
  //
  //     }
  //   }
  //
  //   let resistance = p5.Vector.mult(p.vel,-1);
  //   resistance.normalize();//direction
  //   let speed = p.vel.mag();
  //   let magnitude = speed * speed * C_RESISTANCE;
  //   resistance.mult(magnitude);
  //   p.applyForce(resistance);
  //
  //   let center = createVector(300,300);
  //   let attraction = p5.Vector.sub(center,p.pos)
  //   attraction.mult(0.2)
  //   p.applyForce(attraction);
  //
  //   p.update();
  //   p.display();
  // }

//planet2
  // for( i = 0; i<planetParticles2.length; i++){
  //   let p = planetParticles2[i];
  //   s.checkCollision(p,0.2);
  //   for (let b=0; b<planetParticles2.length; b++) {
  //     let other = planetParticles2[b];
  //     if (i != b) {
  //       p.checkCollision( other );
  //
  //     }
  //   }
  //
  //   let resistance = p5.Vector.mult(p.vel,-1);
  //   resistance.normalize();//direction
  //   let speed = p.vel.mag();
  //   let magnitude = speed * speed * C_RESISTANCE;
  //   resistance.mult(magnitude);
  //   p.applyForce(resistance);
  //
  //   let center = createVector(800,800);
  //   let attraction = p5.Vector.sub(center,p.pos)
  //   attraction.mult(0.55)
  //   p.applyForce(attraction);
  //
  //   p.update();
  //   p.display();
  // }

  //planet3
  for( i = 0; i<planetParticles3.length; i++){
    let p = planetParticles3[i];
    s.checkCollision(p,0.2);
    for (let b=0; b<planetParticles3.length; b++) {
      let other = planetParticles3[b];
      if (i != b) {
        p.checkCollision( other );

      }
    }

    let resistance = p5.Vector.mult(p.vel,-1);
    resistance.normalize();//direction
    let speed = p.vel.mag();
    let magnitude = speed * speed * C_RESISTANCE;
    resistance.mult(magnitude);
    p.applyForce(resistance);

    let center = createVector(1500,500);
    let attraction = p5.Vector.sub(center,p.pos)
    attraction.mult(0.55)
    p.applyForce(attraction);

    p.update();
    p.display();
  }

//planet4
  for( i = 0; i<planetParticles4.length; i++){
    let p = planetParticles4[i];
    s.checkCollision(p,0.1);
    for (let b=0; b<planetParticles4.length; b++) {
      let other = planetParticles4[b];
      if (i != b) {
        p.checkCollision( other );
      }
    }

    let resistance = p5.Vector.mult(p.vel,-1);
    resistance.normalize();//direction
    let speed = p.vel.mag();
    let magnitude = speed * speed * C_RESISTANCE;
    resistance.mult(magnitude);
    p.applyForce(resistance);

    let center = createVector(1300,1100);
    let attraction = p5.Vector.sub(center,p.pos)
    attraction.mult(0.65)
    p.applyForce(attraction);

    p.update();
    p.display();
  }

}

function updateNavigation() {
  // let's create a scroll feature
  let spd = 10;
  console.log(s.pos.y);
  console.log(windowHeight);

  if (mouseX < 100) {
    offsetX -= spd;
  }
  else if (mouseX > windowWidth - 100) {
    offsetX += spd;
  }
  if (s.pos.y < offsetY + 200) {
    offsetY -= spd;
  }
  else if (s.pos.y > offsetY + 1378) {
    offsetY += spd;
  }

  // limit the offset values
  offsetX = constrain(offsetX, 0, canvasWidth - windowWidth);
  offsetY = constrain(offsetY, 0, canvasHeight - windowHeight);
}
window.addEventListener("resize", pageReload);
function pageReload() {
  location.reload();
}


class Planet{
  constructor(x,y,rad,r,g,b,c){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.rad = rad;
    this.mass = rad;
    this.r = r;
    this.g = g;
    this.b = b;
    this.c = c;
  }
  checkCollision(other) {
    let vector = p5.Vector.sub(other.pos, this.pos);
    let distance = vector.mag();
    if (distance < this.rad + other.rad) {

      let force = createVector();

      // this
      force = vector.copy();
      force.mult(-1);
      force.normalize();
      force.mult( other.vel.mag() *this.c );
      //force.mult(0.1);
      this.applyForce( force );

      //other
      force = vector.copy();
      force.normalize();
      force.mult( this.vel.mag() *this.c );
      other.applyForce( force );

    }
  }

  display(){
    push();
    noStroke();
    fill(this.r,this.g,this.b, 150);
    ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);
    pop();
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    }

  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add( force );
  }

}

function drawGradient(x, y) {
  let radius = 300;
  let opa = 0;
  for (let r = 0; r<radius; r++) {
    fill(255);
    ellipse(x, y, r, r);
    opa = opa+1;
    // console.log(opa);
  }
}

class Star{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
  }
  checkCollision(other) {
    let vector = p5.Vector.sub(other.pos, this.pos);
    // let distance = vector.mag();
    let distance = abs(this.pos.x - other.pos.x);
    // console.log(distance);
    if (distance < 150) {

      let force = createVector();
      // this
      force = vector.copy();
      force.mult(-1);
      force.normalize();
      force.mult( other.vel.mag() *0.02 );
      //force.mult(0.1);
      this.applyForce( force );

      //other
      force = vector.copy();
      force.normalize();
      force.mult( this.vel.mag() *0.02 );
      other.applyForce( force );
    }
  }
  applyAttraction(other) {
  let distance = this.pos.dist(other.pos);
  let magnitude = 1/ (distance * distance);
  let force = p5.Vector.sub(other.pos, this.pos);
  force.normalize();
  force.mult(magnitude);
  this.applyForce(force);
}

  checkBoundaries() {
    if (this.pos.y > canvasHeight) {
      this.pos.y = canvasHeight;
      this.vel.y = -this.vel.y*0.3;
      }

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x *0.3;

    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x *0.3;

    }
  }

  display(){
    push();
    let opa1 = 255;

    for(let r = 0; r<20; r+=1){
      let colorR = map(r,0,20,255,102);
      let colorG = map(r,0,20,255,186);
      let colorB = map(r,0,20,255,183);
      noFill();
      strokeWeight(1);
      stroke(colorR,colorG,colorB,opa1)
      ellipse(this.pos.x, this.pos.y, r,r);
      opa1 -= 9;
    }

    let opa2 = 120
    let rad = 50;
    for(let r = rad; r> 30; r -=1){
      let brightness = map(this.vel.mag(),0,15,8,3);
      let colorR = map(this.vel.mag(),0,20,102,191);
      let colorG = map(this.vel.mag(),0,20,186,236);
      let colorB = map(this.vel.mag(),0,20,183,235);
      noFill();
      stroke(colorR,colorG,colorB,opa2)
      ellipse(this.pos.x, this.pos.y, r,r);
      opa2 -= brightness;
    }

    pop();
  }
  update() {
    this.vel.add(this.acc);
    // this.vel.mult(0.995)
    this.pos.add(this.vel);
    this.acc.mult(0);
    }

  applyForce(f) {
    let force = f.copy();
    this.acc.add( force );
  }
}

class Tail{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-1.5,1.5),random(-1.5,1.5));
    this.acc = createVector();
    this.rad = random(2,5);
    this.isDone = false;
    this.accAdj = random(0.001, 0.05);

  }

  display(){
    push();
    noStroke();
    fill(120,194,196,15);
    ellipse(this.pos.x,this.pos.y,this.rad+20,this.rad+20);
    fill(120,194,196,200);
    ellipse(this.pos.x,this.pos.y,this.rad,this.rad);
    pop();
  }

  update(){
    this.acc.mult(this.accAdj);
    this.vel.mult(0.95);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if(this.vel.mag() < 0.05){
      this.isDone = true;
    }
  }
}
class Star2{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.bottom = false;
  }
  display(){
    push();
    fill(255,150)
    ellipse(this.pos.x,this.pos.y,50,50);
    pop();
  }
  checkBoundaries() {
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y*0.3;
      }

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x *0.3;

    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x *0.3;

    }

  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    }
  applyForce(f) {
    let force = f.copy();
    this.acc.add( force );
  }

}
