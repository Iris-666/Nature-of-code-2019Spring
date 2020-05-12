let cols = 20;
let rows = 35;

let particles = make2DArray(cols, rows);
let springs = [];

let w = 20;

let physics;

function setup() {
  noCursor();
  createCanvas(windowWidth, windowHeight);
  physics = new VerletPhysics2D();
  let gravity = new Vec2D(0, 0.1);
  let gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);


  let x = 500;
  for (let i = 0; i < cols; i++) {
    let y = 0;
    for(let j = 0; j < rows; j++){
      let p = new Particle(x,y);
      particles[i][j] = p;
      physics.addParticle(p)
      y = y + w;
    }
    x = x + w;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      // if (i != cols - 1) {
      //   let b1 = particles[i + 1][j];
      //   let s1 = new Spring(a, b1);
      //   springs.push(s1);
      //   physics.addSpring(s1);
      // }
      if (j != rows - 1) {
        let b2 = particles[i][j + 1];
        let s2 = new Spring(a, b2);
        springs.push(s2);
        physics.addSpring(s2);
      }

    }
  }

for(let i=0;i<cols;i++){
  particles[i][0].lock()
  // particles[i][rows-1].lock()

}
  // particles[0][0].lock()
  // particles[cols-1][0].lock()

}


function draw() {
  background(0);
  physics.update();

x = -20
y = 0
  for(let i=0;i<cols-1;i++){
    // particles[i][0].x = mouseX + x
    // particles[i][0].y = mouseY + y
    x += 40/cols;
    if(i <= cols/2){
      y += 1
    }else{
      y-=1
    }

  }


// console.log(particles[0][0]);
// console.log(springs[0]);

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    particles[i][j].drag();
    // particles[i][j].display();
  }
}
  for (let s of springs) {
    s.display();
    // s.setRestLength(10)
  }

}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
