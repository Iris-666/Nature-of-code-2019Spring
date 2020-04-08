let snow = [];
let magics = [];

function setup(){
  createCanvas(1440,800);
  background(0);
}

function draw(){
  console.log(magics.length)
  let mouseVector = createVector(mouseX,mouseY);
  background(0,200);

  snow.push( new snowflakes(random(0,1440),0))

  for(let i = 0; i < snow.length; i++){
    let s = snow[i];
    s.move();
    s.display();
    s.updateLifespan();
    if (s.isDone){
      snow.splice(i,1);
    }
  }

  for (let i = 0;i<magics.length; i++){
    let m = magics[i]
      if(m.isDone == false){
    m.acc = p5.Vector.sub(mouseVector,m.pos) //make the magic particles follow the mouse
  }
    m.moveMagic();
    m.displayMagic();
    if (m.pos.x > 1440 || m.pos.x < 0){
      magics.splice(i,1);
    }
  }
}

function mouseDragged(){
  magics.push(new magic(mouseX, mouseY)); //drag mouse to make magic particles
}

function mousePressed() {
  //press the mouse to explode the magic particles
  for (let i = 0; i < magics.length; i++) {
    magics[i].vel = createVector(random(-2,2), random(-2,2));
    magics[i].isDone = true;
  }
}


class snowflakes{
  constructor(x,y){
    this.pos = createVector(x,y)
    this.vel = createVector(random(-2,2),random(2,4))
    this.acc = createVector()
    this.size = random(4, 7);
    this.lifespan = 1.0;
    this.lifeReduction = 0.005;
    this.isDone = false;

  }

  display(){
    push();
    noStroke();
    fill(255,150);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  move(){
    if(this.pos.y <= 797){
      this.vel.add(this.acc);
      this.pos.add(this.vel)
      }

  if (this.pos.y > 797){
    this.pos.x = this.pos.x;
    this.pos.y = this.pos.y;
    this.lifespan -= this.lifeReduction;
  }
}
  updateLifespan(){
    if(this.lifespan <= 0){
      this.isDone = true;
    }
  }
}

class magic {
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.size = random(3,6);
    this.isDone = false;
    this.accAdj = random(0.001, 0.05);

  }
  displayMagic(){
    push();
    translate(this.pos.x,this.pos.y);
    noStroke();
    fill(120,194,196,100);
    ellipse(0,0,this.size+5,this.size+5);
    fill(120,194,196,150);
    ellipse(0,0,this.size+3,this.size+3);
    fill(120,194,196,200);
    ellipse(0,0,this.size,this.size);
    // if(this.isDone){
    //   let vector = createVector(mouseX - this.pos.x, mouseY - this.pos.y)
    //   vector.setMag(50);
    //   strokeWeight(3)
    //   stroke(120,194,196,40)
    //   line(0,0,vector.x,vector.y)
    // }

    pop();

  }
  moveMagic(){
    if(this.isDone == false){
    this.acc.mult(this.accAdj);
    this.vel.mult(0.95);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
    if(this.isDone){
      this.vel.mult(1.1);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }
  }
}
