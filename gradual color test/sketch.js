let s;
let s2;
const C_RESISTANCE = 0.005;
let tails = [];
const C_GRAVITY = 1;
let canvasWidth, canvasHeight;
let offsetX, offetY;

let planetParticles1 = [];
let planetParticles2 = [];
let planetParticles3 = [];
let planetParticles4 = [];
let planet1light = false;
let planet2light = false;
let planet3light = false;
let planet4light = false;
let planet5light = false;
let planet6light = false;
let planet7light = false;
let planet8light = false;
let planet9light = false;
let planet10light = false;
let planet11light = false;
let planet12light = false;
let planet13light = false;
let planet14light = false;
let planet15light = false;



function setup(){

  createCanvas(windowWidth, 6000);

  background(0);

 // s = new Star(1700,9000);
 // s2 = new Star(700,9000);


}
function draw(){
  background(0);


  for(i = 0; i<10000;i+=100){
    fill('white')
    ellipse(300,i,10,10)
  }


  // let spdVectorLeft = createVector(-1,0)
  // let spdVectorRight = createVector(1,0)

  // if (keyIsDown(LEFT_ARROW)) {
  //   s.applyForce(spdVectorLeft)
  // } else if (keyIsDown(RIGHT_ARROW)) {
  //   s.applyForce(spdVectorRight)
  // }
  //
  // if (keyIsDown(65)) {
  //   s2.applyForce(spdVectorLeft)
  // } else if (keyIsDown(68)) {
  //   s2.applyForce(spdVectorRight)
  // }


  // let resistance = p5.Vector.mult(s.vel,-1);
  // resistance.normalize();//direction
  // let speed = s.vel.mag();
  // let magnitude = speed * speed * C_RESISTANCE;
  // resistance.mult(magnitude);
  // s.applyForce(resistance);
  //
  //
  // let resistance2 = p5.Vector.mult(s2.vel,-1);
  // resistance2.normalize();//direction
  // let speed2 = s2.vel.mag();
  // let magnitude2 = speed2 * speed2 * C_RESISTANCE;
  // resistance2.mult(magnitude2);
  // s2.applyForce(resistance2);
  //
  //
  // let distanceStars = p5.Vector.sub(s.pos,s2.pos);
  // distanceStars = distanceStars.mag();
  // if(distanceStars > 200 ){
  //   let gravity1 = createVector(0,0.1);
  //   let gravity2 = createVector(0,0.1);
  //   s.applyForce(gravity1);
  //   s2.applyForce(gravity2);
  // }
  // if(distanceStars<= 200){
  //   let upForce = createVector(0,-0.1);
  //   s.applyForce(upForce);
  //   s2.applyForce(upForce);
  // }
  //
  //
  //
  // s.checkBoundaries();
  // s.update();
  // s.display();
  //
  // s2.applyAttraction(s)
  // s2.checkBoundaries();
  // s2.update();
  // s2.display();

  // console.log("s:",s.vel);
  // console.log("s2:",s2.vel);

  // canvasPosition = map(s2.pos.y, 0, 10000,0, -7000)
  // console.log(canvasPosition);
  // mycanvas.style.top = canvasPosition + "px"


  // tails.push(new Tail(s.pos.x,s.pos.y))
  // for(i=0;i<tails.length;i++){
  //   let t = tails[i];
  //   t.update();
  //   t.display();
  //
  //   if(t.isDone == true){
  //     tails.splice(i,1);
  //   }
  // }

//planets

textSize(30)
fill(255)
text("1",300,4000)
text("2",800,4500)
text("3",1500,4300)
text("4",1300,5100)
text("5",2300,4800)
text("6",2450,4200)
text("7",1900,3600)
text("8",930,3400)
text("9",2700,3000)
text("10",200,2500)
text("11",1500,2700)
text("12",2500,2500)
text("13",850,1900)
text("14",2000,1600)
text("15",300,1300)


  let opa = 205;
  let freq, amp;
  let x, y, dia;
  freq = frameCount *0.01 ;
  amp = 30 ;
  x = cos(freq) * amp;
  y = sin(freq) * amp;
  dia = sin(freq) * amp*0.4;
  for(r=300;r>0;r-= 1){
    noFill();
    stroke(189,192,186,opa);
    if(planet1light == true){
      stroke(234,235,233,opa+50)
    }
    ellipse(300+x,4000+y,r+dia,r+dia);
    //planet2
    stroke(186,238,161,opa)//green
    if(planet2light == true){
      stroke(217,245,202,opa+50)
    }
    ellipse(800,4500,r+100,r+100)
    //planet3
    stroke(110,117,164,opa);//purple
    if(planet3light == true){
      stroke(182,177,212,opa+50)
    }
    ellipse(1500,4300,r+50,r+50);
    //planet4
    stroke(217,205,144,opa)//yellow
    if(planet4light == true){
      stroke(242,232,181,opa+50)
  }
    ellipse(1300+x,5100+y,r-50+dia,r-50+dia);
    //planet5
    stroke(244,167,185,opa)
    if(planet5light == true){
      stroke(250,234,238,opa+50)
    }
    ellipse(2300,4800,r,r);
    //planet6
    stroke(244,167,185,opa)
    if(planet6light == true){
      stroke(250,234,238,opa+50)
    }
    ellipse(2450,4200,r-100,r-100);
    //planet7
    stroke(88,178,220,opa)
    if(planet7light == true){
      stroke(201,230,245,opa+50)
    }
    ellipse(1900,3600,r+100,r+100);
    //planet8
    stroke(217,205,144,opa)
    if(planet8light == true){
      stroke(242,232,181,opa+50)
    }
    ellipse(930,3400,r+50,r+50);
    //planet9
    stroke(186,238,161,opa)
    if(planet9light == true){
      stroke(217,245,202,opa+50)
    }
    ellipse(2700,3000,r,r);
    //planet10
    stroke(110,117,164,opa);
    if(planet10light == true){
      stroke(182,177,212,opa+50)
    }
    ellipse(200,2500,r,r);
    //planet11
    stroke(189,192,186,opa);
    if(planet11light == true){
      stroke(234,235,233,opa+50)
    }
    ellipse(1500,2700,r+200,r+200);
    //planet12
    stroke(110,117,164,opa);
    if(planet12light == true){
      stroke(182,177,212,opa+50)
    }
    ellipse(2500,2500,r+100,r+100);
    //planet13
    stroke(244,167,185,opa);
    if(planet13light == true){
      stroke(250,234,238,opa+50)
    }
    ellipse(850,1900,r+100,r+100);
    //planet14
    stroke(186,238,161,opa);
    if(planet14light == true){
      stroke(217,245,202,opa+50)
    }
    ellipse(2000,1600,r+200,r+200);
    //planet15
    stroke(217,205,144,opa)
    if(planet15light == true){
      stroke(242,232,181,opa+50)
    }
    ellipse(300,1300,r,r);


    opa -= 4;
  }
}

function mouseClicked(){
  console.log(mouseX, mouseY);
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
