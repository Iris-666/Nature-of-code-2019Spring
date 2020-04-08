let s;
let s2;
const C_RESISTANCE = 0.005;
let tails = [];
let tails2 = [];
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

let params = {
  debugMode: false,
  upForce: -0.1,
  attraction: 0.003,
  controlSpd: 0.8
}

const gui = new dat.GUI();

gui.add(params, 'debugMode' )
gui.add(params, 'upForce', -0.5,-0.05 )
gui.add(params, 'attraction', 0.002, 0.005 )
gui.add(params, 'controlSpd', 0.5, 1 )


// gui.add(params, 'bubbleYposition', 0, 800);
// gui.add(params, 'collisionForce', 0, 4);



function setup(){
  // var cnv = createCanvas(windowWidth, 10000);
  // cnv.id('mycanvas')
  // cnv.position(0,-9000,'absolute')
  // mycanvas = document.getElementById('mycanvas')

  createCanvas(windowWidth, windowHeight);

  canvasWidth = windowWidth;
  canvasHeight = 6500;

  offsetX = 0;
  offsetY = 8422;



  background(0);

 s = new Star(1700,5700);
 s2 = new Star2(700,5700);


}
function draw(){
  background(0);
  // blendMode(ADD);


  updateNavigation();

  translate(-offsetX, -offsetY);
  // console.log(offsetX, offsetY);


  // for(i = 0; i<10000;i+=100){
  //   fill('white')
  //   ellipse(300,i,10,10)
  // }


  let spdVectorLeft = createVector(-params.controlSpd,0)
  let spdVectorRight = createVector(params.controlSpd,0)

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

//planets

  // let pt1 = new Planet(300,4000,189,192,186,0,234,235,233);
  // let pt2 = new Planet(800,4500,186,238,161,100,217,245,202);
  // let pt3 = new Planet(1500,4300,110,117,164,50,182,177,212);
  // let pt4 = new Planet(1300,5100,217,205,144,-50,242,232,181);
  // let pt5 = new Planet(2300,4800,244,167,185,0);
  // let pt6 = new Planet(2450,4200,244,167,185,-100);
  // let pt7 = new Planet(1900,3600,88,178,220,100);
  // let pt8 = new Planet(930,3400,217,205,14,50);
  // let pt9 = new Planet(2700,3000,186,238,161,0);
  // let pt10 = new Planet(200,2500,110,117,164,0);
  // let pt11 = new Planet(1500,2700,189,192,186,200);
  // let pt12 = new Planet(2500,2500,110,117,164,100);
  // let pt13 = new Planet(850,1900,244,167,185,100);
  // let pt14 = new Planet(2000,1600,186,238,161,200);
  // let pt15 = new Planet(300,1300,217,205,144,0);
  //
  // pt1.display();
  // pt2.display();
  // pt3.display();
  // pt4.display();
  // pt5.display();
  // pt6.display();
  // pt7.display();
  // pt8.display();
  // pt9.display();
  // pt10.display();
  // pt11.display();
  // pt12.display();
  // pt13.display();
  // pt14.display();
  // pt15.display();


//resistance
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
    let gravity1 = createVector(0,0.15);
    let gravity2 = createVector(0,0.15);
    s.applyForce(gravity1);
    s2.applyForce(gravity2);
  }
  if(distanceStars<= 200){
    let upForce = createVector(0,params.upForce);
    s.applyForce(upForce);
    s2.applyForce(upForce);
  }


  //apply the attraction of the planets
  let planet1 = createVector(300,4000);
  let attraction1 = p5.Vector.sub(planet1,s.pos)
  let distance1 = attraction1.mag();
  if(distance1 < 200){
    planet1light = true;
  }
  if(distance1<300){
    attraction1.mult(params.attraction)
    s.applyForce(attraction1);
  }
  let attraction1s = p5.Vector.sub(planet1,s2.pos)
  let distance1s = attraction1s.mag();
  if(distance1s<300){
  attraction1s.mult(params.attraction)
  s2.applyForce(attraction1s);
  }


  let planet2 = createVector(800,4500);
  let attraction2 = p5.Vector.sub(planet2,s.pos)
  let distance2 = attraction2.mag();
  if(distance2 < 250){
    planet2light = true;
  }
  if(distance2<350){
  attraction2.mult(params.attraction)
  s.applyForce(attraction2);
  }
  let attraction2s = p5.Vector.sub(planet2,s2.pos)
  let distance2s = attraction2s.mag();
  if(distance2s<350){
  attraction2s.mult(params.attraction)
  s2.applyForce(attraction2s);
  }


  let planet3 = createVector(1500,4300);
  let attraction3 = p5.Vector.sub(planet3,s.pos)
  let distance3 = attraction3.mag();
  if(distance3 < 200){
    planet3light = true;
  }
  if(distance3<350){
  attraction3.mult(params.attraction)
  s.applyForce(attraction3);
  }
  let attraction3s = p5.Vector.sub(planet3,s2.pos)
  let distance3s = attraction3s.mag();
  if(distance3s<350){
  attraction3s.mult(params.attraction)
  s2.applyForce(attraction3s);
  }


  let planet4 = createVector(1300,5100);
  let attraction4 = p5.Vector.sub(planet4,s.pos)
  let distance4 = attraction4.mag();
  if(distance4 < 150){
    planet4light = true;
  }
  if(distance4<250){
  attraction4.mult(params.attraction)
  s.applyForce(attraction4)
  }
  let attraction4s = p5.Vector.sub(planet4,s2.pos)
  let distance4s = attraction4s.mag();
  if(distance4s<250){
  attraction4s.mult(params.attraction)
  s2.applyForce(attraction4s)
  }

  let planet5 = createVector(2300,4800);
  let attraction5 = p5.Vector.sub(planet5,s.pos)
  let distance5 = attraction5.mag();
  if(distance5 < 200){
    planet5light = true;
  }
  if(distance5<250){
  attraction5.mult(params.attraction)
  s.applyForce(attraction5)
  }
  let attraction5s = p5.Vector.sub(planet5,s2.pos)
  let distance5s = attraction5s.mag();
  if(distance5s<250){
  attraction5s.mult(params.attraction)
  s2.applyForce(attraction5s)
  }

  let planet6 = createVector(2450,4200);
  let attraction6 = p5.Vector.sub(planet6,s.pos)
  let distance6 = attraction6.mag();
  if(distance6 < 100){
    planet6light = true;
  }
  if(distance6<250){
  attraction6.mult(params.attraction)
  s.applyForce(attraction6)
  }
  let attraction6s = p5.Vector.sub(planet6,s2.pos)
  let distance6s = attraction6s.mag();
  if(distance6s<250){
  attraction6s.mult(params.attraction)
  s2.applyForce(attraction6s)
  }

  let planet7 = createVector(1900,3600);
  let attraction7 = p5.Vector.sub(planet7,s.pos)
  let distance7 = attraction7.mag();
  if(distance7 < 250){
    planet7light = true;
  }
  if(distance7<400){
  attraction7.mult(params.attraction)
  s.applyForce(attraction7)
  }
  let attraction7s = p5.Vector.sub(planet7,s2.pos)
  let distance7s = attraction7s.mag();
  if(distance7s<400){
  attraction7s.mult(params.attraction)
  s2.applyForce(attraction7s)
  }

  let planet8 = createVector(930,3400);
  let attraction8 = p5.Vector.sub(planet8,s.pos)
  let distance8 = attraction8.mag();
  if(distance8 < 200){
    planet8light = true;
  }
  if(distance8<350){
  attraction8.mult(params.attraction)
  s.applyForce(attraction8)
  }
  let attraction8s = p5.Vector.sub(planet8,s2.pos)
  let distance8s = attraction8s.mag();
  if(distance8s<350){
  attraction8s.mult(params.attraction)
  s2.applyForce(attraction8s)
  }

  let planet9 = createVector(2700,3000);
  let attraction9 = p5.Vector.sub(planet9,s.pos)
  let distance9 = attraction9.mag();
  if(distance9 < 150){
    planet9light = true;
  }
  if(distance9<300){
  attraction9.mult(params.attraction)
  s.applyForce(attraction9)
  }
  let attraction9s = p5.Vector.sub(planet9,s2.pos)
  let distance9s = attraction9s.mag();
  if(distance9s<300){
  attraction9s.mult(params.attraction)
  s2.applyForce(attraction9s)
  }

  let planet10 = createVector(200,2500);
  let attraction10 = p5.Vector.sub(planet10,s.pos)
  let distance10 = attraction10.mag();
  if(distance10 < 150){
    planet10light = true;
  }
  if(distance10<300){
  attraction10.mult(params.attraction)
  s.applyForce(attraction10)
  }
  let attraction10s = p5.Vector.sub(planet10,s2.pos)
  let distance10s = attraction10s.mag();
  if(distance10s<300){
  attraction10s.mult(params.attraction)
  s2.applyForce(attraction10s)
  }

  let planet11 = createVector(1500,2700);
  let attraction11 = p5.Vector.sub(planet11,s.pos)
  let distance11 = attraction11.mag();
  if(distance11 < 350){
    planet11light = true;
  }
  if(distance11<400){
  attraction11.mult(params.attraction)
  s.applyForce(attraction11)
  }
  let attraction11s = p5.Vector.sub(planet11,s2.pos)
  let distance11s = attraction11s.mag();
  if(distance11s<400){
  attraction11s.mult(params.attraction)
  s2.applyForce(attraction11s)
  }

  let planet12 = createVector(2500,2500);
  let attraction12 = p5.Vector.sub(planet12,s.pos)
  let distance12 = attraction12.mag();
  if(distance12 < 250){
    planet12light = true;
  }
  if(distance12<400){
  attraction12.mult(params.attraction)
  s.applyForce(attraction12)
  }
  let attraction12s = p5.Vector.sub(planet12,s2.pos)
  let distance12s = attraction12s.mag();
  if(distance12s<400){
  attraction12s.mult(params.attraction)
  s2.applyForce(attraction12s)
  }

  let planet13 = createVector(850,1900);
  let attraction13 = p5.Vector.sub(planet13,s.pos)
  let distance13 = attraction13.mag();
  if(distance13 < 250){
    planet13light = true;
  }
  if(distance13<400){
  attraction13.mult(params.attraction)
  s.applyForce(attraction13)
  }
  let attraction13s = p5.Vector.sub(planet13,s2.pos)
  let distance13s = attraction13s.mag();
  if(distance13s<400){
  attraction13s.mult(params.attraction)
  s2.applyForce(attraction13s)
  }

  let planet14 = createVector(2000,1600);
  let attraction14 = p5.Vector.sub(planet14,s.pos)
  let distance14 = attraction14.mag();
  if(distance14 < 350){
    planet14light = true;
  }
  if(distance14<400){
  attraction14.mult(params.attraction)
  s.applyForce(attraction14)
  }
  let attraction14s = p5.Vector.sub(planet14,s2.pos)
  let distance14s = attraction14s.mag();
  if(distance14s<400){
  attraction14s.mult(params.attraction)
  s2.applyForce(attraction14s)
  }

  let planet15 = createVector(300,1300);
  let attraction15 = p5.Vector.sub(planet15,s.pos)
  let distance15 = attraction15.mag();
  if(distance15 < 150){
    planet15light = true;
  }
  if(distance15<300){
  attraction15.mult(params.attraction)
  s.applyForce(attraction15)
  }
  let attraction15s = p5.Vector.sub(planet15,s2.pos)
  let distance15s = attraction15s.mag();
  if(distance15s<300){
  attraction15s.mult(params.attraction)
  s2.applyForce(attraction15s)
  }


  push();
  blendMode(ADD);

  s.checkBoundaries();
  // s.checkCollision(s2)
  s.update();
  s.display();

  s2.applyAttraction(s)
  s2.checkBoundaries();
  s2.update();
  s2.display();
pop();

  tails.push(new Tail(s.pos.x,s.pos.y))
  for(i=0;i<tails.length;i++){
    let t = tails[i];
    t.update();
    t.display();

    if(t.isDone == true){
      tails.splice(i,1);
    }
  }

  tails2.push(new Tail2(s2.pos.x,s2.pos.y))
  for(i=0;i<tails2.length;i++){
    let t2 = tails2[i];
    t2.update();
    t2.display();

    if(t2.isDone == true){
      tails2.splice(i,1);
    }
  }


//planets

if(params.debugMode){
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
}


  let opa = 205;
  let freq, amp;
  let x, y, dia;
  freq = (frameCount) *0.01 ;
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
    ellipse(300+x,4000+y,r,r);
    //planet2
    stroke(186,238,161,opa)//green
    if(planet2light == true){
      stroke(217,245,202,opa+50)
    }
    ellipse(800+x,4500+y,r+100,r+100)
    //planet3
    stroke(110,117,164,opa);//purple
    if(planet3light == true){
      stroke(182,177,212,opa+50)
    }
    ellipse(1500+x,4300+y,r+50,r+50);
    //planet4
    stroke(217,205,144,opa)//yellow
    if(planet4light == true){
      stroke(242,232,181,opa+50)
  }
    ellipse(1300+x,5100+y,r-50,r-50);
    //planet5
    stroke(244,167,185,opa)
    if(planet5light == true){
      stroke(250,234,238,opa+50)
    }
    ellipse(2300+x,4800+y,r,r);
    //planet6
    stroke(244,167,185,opa)
    if(planet6light == true){
      stroke(250,234,238,opa+50)
    }
    ellipse(2450+x,4200+y,r-100,r-100);
    //planet7
    stroke(88,178,220,opa)
    if(planet7light == true){
      stroke(201,230,245,opa+50)
    }
    ellipse(1900+x,3600+y,r+100,r+100);
    //planet8
    stroke(217,205,144,opa)
    if(planet8light == true){
      stroke(242,232,181,opa+50)
    }
    ellipse(930+x,3400+y,r+50,r+50);
    //planet9
    stroke(186,238,161,opa)
    if(planet9light == true){
      stroke(217,245,202,opa+50)
    }
    ellipse(2700+x,3000+y,r,r);
    //planet10
    stroke(110,117,164,opa);
    if(planet10light == true){
      stroke(182,177,212,opa+50)
    }
    ellipse(200+x,2500+y,r,r);
    //planet11
    stroke(189,192,186,opa);
    if(planet11light == true){
      stroke(234,235,233,opa+50)
    }
    ellipse(1500+x,2700+y,r+200,r+200);
    //planet12
    stroke(110,117,164,opa);
    if(planet12light == true){
      stroke(182,177,212,opa+50)
    }
    ellipse(2500+x,2500+y,r+100,r+100);
    //planet13
    stroke(244,167,185,opa);
    if(planet13light == true){
      stroke(250,234,238,opa+50)
    }
    ellipse(850+x,1900+y,r+100,r+100);
    //planet14
    stroke(186,238,161,opa);
    if(planet14light == true){
      stroke(217,245,202,opa+50)
    }
    ellipse(2000+x,1600+y,r+200,r+200);
    //planet15
    stroke(217,205,144,opa)
    if(planet15light == true){
      stroke(242,232,181,opa+50)
    }
    ellipse(300+x,1300+y,r,r);


    opa -= 4;
  }


}

function updateNavigation() {
  // let's create a scroll feature
  let spd = 10;

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
    if (this.pos.y > canvasHeight - 60) {
      // this.pos.y = canvasHeight;
      // this.vel.y = -this.vel.y*0.3;
      this.acc.y = -1;
      }else if (this.pos.y <0) {
        this.pos.y = 0;
        this.vel.y = -this.vel.y *0.3;
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

    // console.log(this.vel);

    for(let r = 0; r<25; r+=1){
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
    let rad = 60;
    for(let r = rad; r> 30; r -=1){
      let brightness = map(this.vel.mag(),0,15,8,3);
      let colorR = map(this.vel.mag(),0,15,102,191);
      let colorG = map(this.vel.mag(),0,15,186,236);
      let colorB = map(this.vel.mag(),0,15,183,235);
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

class Star2{
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
    if (this.pos.y > canvasHeight - 50) {
      // this.pos.y = canvasHeight;
      // this.vel.y = -this.vel.y*0.3;
      this.acc.y = -1;
    }else if (this.pos.y <0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y *0.3;
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

    // console.log(this.vel);

    for(let r = 0; r<20; r+=1){
      let colorR = map(r,0,20,255,240);
      let colorG = map(r,0,20,255,160);
      let colorB = map(r,0,20,255,107);
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
      let colorR = map(this.vel.mag(),0,15,240,255);
      let colorG = map(this.vel.mag(),0,15,160,213);
      let colorB = map(this.vel.mag(),0,15,107,185);
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

class Tail2{
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
    fill(240,160,107,15);
    ellipse(this.pos.x,this.pos.y,this.rad+20,this.rad+20);
    fill(240,160,107,200);
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

// class Planet{
//   constructor(x,y,r,g,b,rad,lightr,lightg,lightb){
//     this.pos = createVector(x,y);
//     this.r = r;
//     this.g = g;
//     this.b = b;
//     this.rad = rad;
//     this.light = false;
//     this.lightr = lightr;
//     this.lightg = lightg;
//     this.lightb = lightb;
//
//   }
//   color(r,g,b){
//     this.r = r;
//     this.g = g;
//     this.b = b;
//   }
//   display(){
//     push();
//     let opa = 205;
//     let freq, amp;
//     let x, y, dia;
//     translate(this.pos.x,this.pos.y);
//     for(let r = 300;r>0;r -=1){
//       noFill();
//       stroke(this.r,this.g,this.b,opa);
//       if(this.light == true){
//         stroke(this.lightr,this.lightg,this.lightb, opa+50);
//       }
//       freq = frameCount *0.01 ;
//       amp = 30 ;
//       x = cos(freq) * amp;
//       y = sin(freq) * amp;
//       dia = sin(freq) * amp*0.4;
//       ellipse(x,y,r+dia+this.rad,r+dia+this.rad);
//       opa -= 4
//     }
//     pop();
//   }
// }

// class Planet{
//   constructor(x,y,rad,r,g,b,c){
//     this.pos = createVector(x,y);
//     this.vel = createVector();
//     this.acc = createVector();
//     this.rad = rad;
//     this.mass = rad;
//     this.r = r;
//     this.g = g;
//     this.b = b;
//     this.c = c;
//   }
//   checkCollision(other) {
//     let vector = p5.Vector.sub(other.pos, this.pos);
//     let distance = vector.mag();
//     if (distance < this.rad + other.rad) {
//
//       let force = createVector();
//
//       // this
//       force = vector.copy();
//       force.mult(-1);
//       force.normalize();
//       force.mult( other.vel.mag() *this.c );
//       //force.mult(0.1);
//       this.applyForce( force );
//
//       //other
//       force = vector.copy();
//       force.normalize();
//       force.mult( this.vel.mag() *this.c );
//       other.applyForce( force );
//
//     }
//   }
//
//   display(){
//     push();
//     noStroke();
//     fill(this.r,this.g,this.b, 150);
//     ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);
//     pop();
//   }
//   update() {
//     this.vel.add(this.acc);
//     this.pos.add(this.vel);
//     this.acc.mult(0);
//     }
//
//   applyForce(f) {
//     let force = f.copy();
//     force.div(this.mass);
//     this.acc.add( force );
//   }
//
// }
//
// function drawGradient(x, y) {
//   let radius = 300;
//   let opa = 0;
//   for (let r = 0; r<radius; r++) {
//     fill(255);
//     ellipse(x, y, r, r);
//     opa = opa+1;
//     // console.log(opa);
//   }
// }
