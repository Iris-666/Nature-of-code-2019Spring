let params = {
  bubbleXposition: 2300,
  bubbleYposition: 670,
  collisionForce: 0.8
}

const gui = new dat.GUI();
// gui.remember(params);
gui.add(params, 'bubbleXposition', 0, 2350)
gui.add(params, 'bubbleYposition', 0, 800);
gui.add(params, 'collisionForce', 0, 4);

let particles = [];
let explodeParticles = [];
let C_GRAVITY = 1;
const C_RESISTANCE = 0.005;


function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0,100);
  img = loadImage('bubble.png')

}

function draw(){
  background(0);
  // image(img,1750,0);
image(img,params.bubbleXposition - 550, params.bubbleYposition - 670)

  if(particles.length < 40){
    particles.push(new Particle(params.bubbleXposition, params.bubbleYposition, random(15,100)));
  }

  for( i = 0; i<particles.length; i++){
    let p = particles[i];
    for (let b=0; b<particles.length; b++) {
      let other = particles[b];
      if (i != b) {
        p.checkCollision( other );//make the bubbles collide with each other

        p.applyAttraction(other);
      }
    }


    let gravity = createVector(0,C_GRAVITY/10);
    p.applyForce(gravity);
    // let blow = createVector(random(0.1,1),random(-1,1))
    // p.applyForce(blow)

    let resistance = p5.Vector.mult(p.vel,-1);
    resistance.normalize();//direction
    let speed = p.vel.mag();
    let magnitude = speed * speed * C_RESISTANCE;
    resistance.mult(magnitude);
    p.applyForce(resistance)



    p.update();
    p.updateLifespan();
    p.checkMouse();
    if (p.isDone){
      particles.splice(i,1);
    }
    let collision = p.checkEdges();
    if (collision && p.vel.mag() > 10) {
      let numOfParticle = round(random(1,3));
      for (let j=0; j<numOfParticle; j++) {
        // let's get the mass and direction from the original particle
        let pos = p.pos.copy();
        let mass = p.rad;
        let vector = p.vel.copy();
        // let's adjust them a little
        mass = mass * random(0.5,0.7);
        vector.mult( params.collisionForce );
        vector.rotate( random(-PI/4, PI/4) );
        // let's create a new particle finally!
        let newParticle = new Particle(pos.x, pos.y, mass);
        newParticle.vel = vector.copy();
        particles.push( newParticle );
        // this is recursive so we MUST limit the chance of reproduction
        // check the particle's function: checkBoundaries()
      }
    }
    p.display();
    // console.log(particles.length);
  }

  for(i = 0; i<explodeParticles.length; i++){
    let e = explodeParticles[i];
    let gravity = createVector(0,1)
    e.applyForce(gravity);

    e.update();
    e.display();
    if (e.isDone){
      explodeParticles.splice(i,1);
    }

  }


}

function mousePressed(){
  console.log('mouse pressed');
  for( i = 0; i<particles.length; i++){
    let p = particles[i]
    let d = dist(mouseX, mouseY, p.pos.x, p.pos.y);
    if( d< p.rad){
      console.log('mouse press work');
      particles.splice(i,1);

      for(let i=0;i<10;i++){
        let pos = p.pos.copy();
        p.rad = 5
        let newParticle = new ExplodeParticle(pos.x, pos.y);

        explodeParticles.push( newParticle );


      }
    }

  }

}

class Particle{
  constructor(x,y,m){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5,-20),random(-2,2));
    this.acc = createVector();
    this.rad = m;
    this.mass = m/10;
    this.lifespan = 1.0;
    this.lifeReduction = 0.005;
    this.isDone = false;
    this.r = random(200,255);
    this.g = random(120,200);
    this.b = random(100,130)


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
      force.mult( other.vel.mag() *0.2 );
      //force.mult(0.1);
      this.applyForce( force );

      //other
      force = vector.copy();
      force.normalize();
      force.mult( this.vel.mag() *0.2 );
      other.applyForce( force );

    }
  }

  checkEdges() {
    let state = false;
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;

    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;

    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;

    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;

      this.isDone = true;
      if (this.mass > 3) {
        state = true;
      }
    }
    return state;
  }


  display(){
    push();
    noStroke();
    fill(this.r, this.g, this.b, 100);
    ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);
    pop();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.vel.mag() < 2){ //if velocity is lower than 2, start to reduce lifespan
      this.lifespan -= this.lifeReduction;
    }

  }
  updateLifespan(){
    if(this.lifespan <= 0){
      this.isDone = true;
    }
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add( force );
  }
  applyAttraction(other) {
  let distance = this.pos.dist(other.pos);
  let magnitude = (C_GRAVITY *2 * this.mass * other.mass) / (distance * distance);
  let force = p5.Vector.sub(other.pos, this.pos);
  force.normalize();
  force.mult(magnitude);
  this.applyForce(force);
}

  //check if mouse is over the ellipse
  checkMouse(){
    let mouseOver = false
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d<this.rad){
      // this.r = 255;
      // this.g = 0;
      // this.b = 0;
      //
      mouseOver = true;
    }
    // else {
    //   this.r = 255;
    //   this.g = 255;
    //   this.b = 255;
    // }
    return mouseOver;
  }
}

class ExplodeParticle{
  constructor(x,y){
    this.pos = createVector(x,y)
    this.vel = createVector( random(-5,5), random(-5,5));
    this.acc = createVector();
    this.isDone = false;
  }
  display(){
    push();
    noStroke();
    fill(255, 150);
    ellipse(this.pos.x, this.pos.y,10,10);
    pop();
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if(this.pos.y > windowHeight){
      this.isDone = true;
    }
  }
  applyForce(f) {
    let force = f.copy();
    this.acc.add( force );
  }



}
