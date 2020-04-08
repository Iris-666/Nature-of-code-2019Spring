let particles = [];


function setup() {
  createCanvas(500, 600);
  background(0);
  particles.push( new Particle(width/2, 50, random(10, 20)) );
}


function draw() {
  background(0);

  for (let i=0; i<particles.length; i++) {
    let p = particles[i];

    let gravity = createVector(0,1 * p.mass);
    p.applyForce(gravity);

    let collision = p.checkBoundaries();
    if (collision) {
      let numOfParticle = round(random(4,10));
      for (let j=0; j<numOfParticle; j++) {
        // let's get the mass and direction from the original particle
        let pos = p.pos.copy();
        let mass = p.mass;
        let vector = p.vel.copy();
        // let's adjust them a little
        mass *= random(0.4, 0.6);
        vector.mult( random(0.6, 0.9) );
        vector.rotate( random(-PI/4, PI/4) );
        // let's create a new particle finally!
        let newParticle = new Particle(pos.x, pos.y, mass);
        newParticle.vel = vector.copy();
        particles.push( newParticle );
        // this is recursive so we MUST limit the chance of reproduction
        // check the particle's function: checkBoundaries()
      }
    }
    p.update();
    p.display();
  }

  for (let i=particles.length-1; i>=0; i--) {
    let p = particles[i];
    if (p.isDone) {
      particles.splice(i, 1);
    }
  }

  fill(255);
  text(particles.length, 10, 20);
}

function mousePressed() {
  particles.push( new Particle(width/2, 50, random(10, 20)) );
}
