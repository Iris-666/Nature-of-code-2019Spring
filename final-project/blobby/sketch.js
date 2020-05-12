particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noCursor();

  for(let i=0;i<400;i++){
    particles.push(new Particle(random(-width/2,width/2),random(-width/2 - 100,width/2 - 100)))
  }


}

function draw() {
  background(0,10);
  for(let i=0;i<particles.length;i++){
    let p = particles[i];
    setTimeout(function(){
      let centerVec = createVector(0,0);
      vec = p5.Vector.sub(centerVec,p.pos);
      direction = vec.normalize();
      direction.mult(0.3)
      p.applyForce(direction)
      p.update();
    },2000)

    if(p.isDone){
      particles.splice(i,1);
    }

    p.display();
  }
}


class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.isDone = false;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if(this.pos.x < 10 && this.pos.x > -10 && this.pos.y < 10&& this.pos.y > -10){
      this.isDone = true;
    }
  }
  applyForce( f ) {
    let force = f.copy();
    this.acc.add( force );
  }
  display() {
    push();
    translate(width/2,height/2)
    // rotate(frameCount*0.03)
    translate(this.pos.x,this.pos.y)
    noStroke();
    fill(255);
    ellipse(0, 0, 2,2);
    pop();
  }
}
