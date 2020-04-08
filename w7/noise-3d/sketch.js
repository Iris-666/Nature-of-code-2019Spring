let ballA, ballB;
let springAB;

function setup() {
  createCanvas(500, 500);
  background(0);

  ballA = new Ball(100, 100, 30);
  ballB = new Ball(100, 100, 40);

  springAB = new Spring(ballA, ballB, 50);

}

function draw() {
  background(0);

  springAB.update();
  springAB.display();

  ballA.drag();
  ballA.update();
  ballA.display();

  ballB.drag();
  ballB.update();
  ballB.display();


}

class Ball{
  constructor(x,y,m){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = m;
    this.rad = m;
    this.damping = 0.98; //0.9 ~ 0.98

  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.vel.mult(this.damping)
  }
  applyForce(f){
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  display(){
    push();
    fill(255,150);
    stroke(255);
    ellipse(this.pos.x,this.pos.y, this.rad*2,this.rad*2);
    pop();
  }
  drag(){
    let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(mouseIsPressed && distance < this.rad){
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }
}


class Spring{
  constructor(a,b,len){ //when constrcting a spring, needs two ball and length
    this.ballA = a;
    this.ballB = b;
    this.len = len;
    this.k = 0.2;
  }
  update(){
    let vector = p5.Vector.sub(this.ballA.pos, this.ballB.pos);
    let distance = vector.mag();
    let direction = vector.copy().normalize();
    let stretch = distance - this.len;


    //hooke's law
    let mag = -1 * this.k * stretch;
    let force = direction.copy();
    force.mult(mag);
    this.ballA.applyForce(force);
    force.mult(-1);
    this.ballB.applyForce(force)
  }
  display(){
    push();
    stroke(255, 0, 0)
    strokeWeight(2)
    line(this.ballA.pos.x, this.ballA.pos.y, this.ballB.pos.x, this.ballB.pos.y);
    pop();
  }
}
