let s1, s2;
let gravity = 9.0;
let mass = 2.0;
let springs = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255, 126);
  // Inputs: x, y, mass, gravity

  for(let i = 0;i<10;i++){
    springs.push(new Spring(width/2, 100, mass, gravity))
}
}

function draw() {
  background(0);

  for(let i = 0;i<springs.length;i++){
    let s = springs[i]
    if(i == 0){
      // s.update(mouseX, mouseY);
      s.display(width/2, 100)
    }else{
      s.drag()
      s.update(springs[i-1].x,springs[i-1].y)
      s.display(springs[i-1].x,springs[i-1].y)
    }
    if(i < springs.length-1){
      // s.update(springs[i+1].x,springs[i+1].y)
      // s.display(springs[i+1].x,springs[i+1].y)

    }
  }

}


class Spring{
  constructor(xpos, ypos, m, g) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.vx = 0; // The x- and y-axis velocities
  this.vy = 0;
  this.mass = m;
  this.gravity = g;
  this.rad = 30;
  this.stiffness = 0.2;
  this.damping = 0.5;
}
  update (targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    let forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

display(nx, ny) {
    noStroke();
    ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }

  drag() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseIsPressed && distance < this.rad) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

}
