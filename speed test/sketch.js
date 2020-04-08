let s;
let s2;
const C_RESISTANCE = 0.005;
let tails = [];
const C_GRAVITY = 1;
// let mycanvas;
let canvasWidth, canvasHeight;
let offsetX, offetY;


function setup(){
  var cnv = createCanvas(windowWidth, 10000);
  // var cnv = createCanvas(windowWidth, windowHeight);

  cnv.id('mycanvas')
  cnv.position(0,0,'absolute')
  mycanvas = document.getElementById('mycanvas')

  background(0);

  canvasWidth = windowWidth * 3;
  canvasHeight = windowHeight * 3;

  offsetX = 0;
  offsetY = 0;


 s = new Star(1700,700);
 // s2 = new Star2(700,700);
 s2 = new Star(700,700);

 // springAB = new Spring(s, s2, 100);

}
function draw(){
  background(0);

  // updateNavigation();



  // translate(-offsetX, -offsetY);
  // console.log(offsetX, offsetY);


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



  // let mouseAttraction = p5.Vector.sub(mouseVector,s.pos);
  // mouseAttraction.mult(0.005)
  // s.applyForce(mouseAttraction);


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


  s.checkBoundaries();
  // s.checkCollision(s2)
  s.update();
  s.display();

  s2.checkBoundaries();
  s2.update();
  s2.display();

  console.log("s:",s.vel);
  console.log("s2:",s2.vel);


  // canvasPosition = map(s2.pos.y, 0, 10000,0, -7000)
  // console.log(canvasPosition);
  // mycanvas.style.top = canvasPosition + "px"



  tails.push(new Tail(s.pos.x,s.pos.y))
  for(i=0;i<tails.length;i++){
    let t = tails[i];
    t.update();
    t.display();

    if(t.isDone == true){
      tails.splice(i,1);
    }
  }
}


function updateNavigation() {
  // let's create a scroll feature
  let spd = 10;
  // console.log(s.pos);
  if (s.pos.x < 200) {
    offsetX += s.vel.x;
    // s.pos.x += s.vel.x;
    // s2.pos.x += s.vel.x;
  }
  else if (s.pos.x > windowWidth - 200) {
    offsetX -= s.vel.x;
    // s.pos.x -= s.vel.x;
    // s2.pos.x -= s.vel.x;

  }
  if (s.pos.y < 200) {
    offsetY += s.vel.y;
    // s.pos.y += s.vel.y;
    // s2.pos.y += s.vel.y;

  }
  else if (s.pos.y > windowHeight - 200) {
    offsetY -= s.vel.y;
    // s.pos.y -= s.vel.y;
    // s2.pos.y -= s.vel.y;

  }
  // limit the offset values
  offsetX = constrain(offsetX, 0, canvasWidth - windowWidth);
  offsetY = constrain(offsetY, 0, canvasHeight - windowHeight);
}

window.addEventListener("resize", pageReload);
function pageReload() {
  location.reload();
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
    console.log(distance);
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
    let offsetVector = createVector(offsetX,offsetY)
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    }

  applyForce(f) {
    let force = f.copy();
    this.acc.add( force );
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
