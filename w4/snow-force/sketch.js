// const C_GRAVITY = 0.2;
const C_RESISTANCE = 0.005;
let density = 1;

let snowflakes = [];

function setup(){
  createCanvas(1540,860);
  background(0);
  img = loadImage('room1.png')
}
function draw(){
  console.log(frameRate());
  background(20,200)
  for(let i= 0; i<density;i++){
    snowflakes.push( new snowflake(random(-200,1640),0))
  }
  let mouseVector = createVector(mouseX,mouseY);
  for(let i = 0; i < snowflakes.length; i++){
    let s = snowflakes[i];

    //change gravity according to mouseY
    C_GRAVITY = map(mouseY, 0, 760, 0.5,0.1);
    let gravity = createVector(0, C_GRAVITY);
    s.applyForce( gravity );

    //change wind direction accordig to mouseX position
    x = map(mouseX, 0, 1440,1,-1);
        let wind = createVector(random(x, 0));
        s.applyForce( wind );

    //change density according to mouseY position
    d = map(mouseY,0,760,1.5,0.5);
    density = d;

    //resistance
    let resistance = p5.Vector.mult(s.vel,-1);
    resistance.normalize();//direction
    let speed = s.vel.mag();
    let magnitude = speed * speed * C_RESISTANCE;
    resistance.mult(magnitude);
    s.applyForce(resistance)

    s.update();
    s.display();
    s.updateLifespan();
    if (s.isDone){
      snowflakes.splice(i,1);
    }
  }
  image(img,0,-40,1540,900);

}


class snowflake{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector();
    this.size = random(4, 7);
    this.lifespan = 1.0;
    this.lifeReduction = 0.005;
    this.isDone = false;
    this.mass = this.size/5;

  }
  display(){
    push();
    noStroke();
    fill(255,150);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.pos.y > 797){
      this.pos.x = this.pos.x;
      this.pos.y = this.pos.y;
      this.lifespan -= this.lifeReduction;
    }

  }
  applyForce( f ) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add( force );
  }
  updateLifespan(){
    if(this.lifespan <= 0){
      this.isDone = true;
    }
  }


}
