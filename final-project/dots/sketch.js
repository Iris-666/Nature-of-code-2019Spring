let positions = [];
let dots = new Array(5).fill(0).map(n => new Array(100).fill(0));
let f = [];


function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  angleMode(DEGREES);
  noCursor();
  // frameRate(10)

// for(let n=0;n<5;n++){
  for(let i=0; i<200;i++){
    // let x = sin((36/20)*i)*100;
    let x = map(i,0,199,-100,100)
    // let y = cos((36/20)*i)*40;
    let y=0;
    pos = createVector(x, y)
    positions.push(pos);
    dots[0][i] = new Dot(pos.x,pos.y)
  }
// }
for(let i=0; i<200;i++){
  f.push(createVector(random(-2,2),random(-2,2)))
}

}

function draw(){
  background(0)
//  push();
//  translate(width/2,height/2);
//  stroke(255);
//  noFill();
//  for(let n=0;n<5;n++){
//  for(let i=0;i<positions.length;i++){
//    let p = positions[i]
//    let m = map(n,0,5,-20,20)
//    ellipse(p.x, p.y+m, 1, 1)
//  }
// }
//  pop();

// if(frameCount%2 == 0){
// // for(let n=0;n<5;n++){
// for(let i=0;i<200;i++){
//   let d = dots[0][i]
//   // let m = map(n,0,5,-15,15)
//   let noiseValue = noise((i+10)*0.05)
//   let m = map(noiseValue,0,1,-100,100)
//   // d.pos.x = d.pos.x + m
//   d.pos.y = d.pos.y + m
//
// }
// }
// }
// else{
// for(let n=0;n<5;n++){
// for(let i=0;i<100;i++){
//  let d = dots[n][i]
//  let m = map(n,0,5,-15,15)
//  d.pos.x = d.pos.x - m
//  d.pos.y = d.pos.y + m
// }
// }
// }

// setTimeout(function(){
//   // for(let n=0;n<5;n++){
//   for(let i=0;i<200;i++){
//    let d = dots[0][i]
//    let x = map(i,0,199,-100,100)
//    d.pos.x = x
//    d.pos.y = 0
//   }
//   // }
// },100)

// for(let n=0;n<5;n++){
  for(let i=0; i<200;i++){
    let d = dots[0][i]
    // console.log(dots);
    d.applyForce(f[i])
    d.update()
    d.display();
}
// }

}

class Dot{
  constructor(x,y){
    this.pos = createVector(x,y)
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
    translate(width/2,height/2);
    stroke(255);
    noFill();
    ellipse(this.pos.x,this.pos.y, 1, 1)
    pop();

  }
}
