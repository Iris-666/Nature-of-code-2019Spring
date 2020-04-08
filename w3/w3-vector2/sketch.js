let particles = []
function setup(){
  createCanvas(400,500)
  background(0);
  for(let i=0; i<100; i++){
  particles.push( new Particle(width/2,height));
}

}

function draw(){
  background(0,30)

  for (let i=0; i < particles.length; i++){
    let p = particles[i];

    if(mouseIsPressed){
      p.explode();
    }


// p.acc = createVector(0,0.1)
    p.update();
    p.display();
  }

}

class Particle{
  constructor(x,y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0,-10);
    this.acc = createVector(0,0.1);

    this.size = random(3,10);
  }
  update(){
  //  acc -> vel -> pos
  this.vel.add( this.acc);//this.vel = this.vel + this.acc
  this.pos.add( this.vel);//this.x += this.xSpd

  //the acceleration should be reset
  // console.log(this.acc);
  // this.acc.mult(0)
  }

  explode(){
    this.vel = createVector( random(-5,5), random(-5,5))
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    noStroke();
    ellipse(0, 0, this.size, this.size);
    pop();
  }

}
