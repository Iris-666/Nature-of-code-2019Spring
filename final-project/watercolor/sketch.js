// const pitch = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4'];
// const keys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', '\;', '\''];
// let notes = [];
// let reverb = new Tone.Reverb(8).toMaster();
// reverb.preDelay = 0.1;
// let filter = new Tone.Filter(100, "lowpass", -48).toMaster();
// var autoPanner = new Tone.AutoPanner("1n").toMaster().start();
// for (var i = 0; i < keys.length; i++) {
//   notes.push(new Tone.Synth().toMaster());
//
//   notes[i].connect(filter);
//   notes[i].connect(autoPanner);
//   notes[i].connect(reverb);
// }
let params = {
  changeBackground: "#141414",
  size: 100,
  strength: 2,
  noisy: 1,
  speed: 0.3,
  // reset: () => setClear(),
  // saveMyWork: () => saveMyWork()
}
let inkdrops = [];

window.onload = () => {
  let gui = new dat.GUI();
  gui.addColor(params, "changeBackground").onFinishChange(() => alert("Press reset after changing the color."));
  gui.add(params, "size", 50, 200);
  gui.add(params, "strength", 1, 4);
  gui.add(params, "noisy", 0, 1);
  gui.add(params, "speed", 0, 1);
  gui.add(params, "reset");
  // gui.add(params, "saveMyWork");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0);
  inkdrops.push(new InkDrop(random(params.size * 0.5, width - params.size * 0.5),
  random(params.size * 0.5, height - params.size * 0.5),
  map(10, 0, 12, 0, 360),
  10
));
// notes[i].triggerAttack(pitch[i], '4n', 0.5);

  // alert("Try to press the 'A' key on the keyboard.");
}

function draw() {
  // update
  for (let i = 0; i < inkdrops.length; i++) {
    let a = inkdrops[i];
    let amp = params.speed;
    let xoff = 0.01 * frameCount + 100*i;
    let yoff = 0.01 * frameCount - 100*i;
    let noiseX = map(noise(xoff), 0, 1, -amp, amp);
    let noiseY = map(noise(yoff), 0, 1, -amp, amp);
    let randomForce = createVector(noiseX, noiseY);
    a.applyForce(randomForce);

    a.update();
    a.display();
    a.checkBoundaries();
    for (let j = 0; j < inkdrops.length; j++) {
      if (i != j) {
        a.applyRepulsion(inkdrops[j]);
      }
    }
  }
  //delete finished
  for (let i = inkdrops.length - 1; i >= 0; i--) {
    let a = inkdrops[i];
    if (a.dead) {
      inkdrops.splice(i, 1);
    }
  }

}

// function setClear(){
//   clear();
//   background(0);
// }

// function saveMyWork(){
//   saveFrames("my_chord_painting", "jpg", 1, 1);
// }

function keyPressed(){
  console.log("keypress");
  for (var i = 0; i < keys.length; i++) {
    if (key === keys[i]) {
      inkdrops.push(new InkDrop(random(params.size * 0.5, width - params.size * 0.5),
      random(params.size * 0.5, height - params.size * 0.5),
      map(i % 12, 0, 12, 0, 360),
      i
    ));
    notes[i].triggerAttack(pitch[i], '4n', 0.5);
    console.log(key);
  }
}
}
// function keyReleased(){
//   for (let i = 0; i < notes.length; i++) {
//     if (key === keys[i]) {
//       notes[i].triggerRelease();
//       for (let j = 0; j < inkdrops.length; j++) {
//         let a = inkdrops[j];
//         if (a.index == i) {
//           a.dead = true;
//           console.log(i + "fade");
//         }
//       }
//     }
//   }
// }


class InkDrop {
  constructor(x,y,hue,index){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5,5),random(-5,5));
    this.acc = createVector(0,0);
    this.hue = hue;
    this.rims = [];
    this.springs = [];
    this.midSprs = [];
    this.phase = random(1000);
    this.dead = false;
    this.index = index;
    this.mass = 2;
    for (let i = 0; i < 10; i++) {
      let mag = params.size * (1 - params.noisy) + params.size * params.noisy * noise(i + this.phase);
      let angle = radians(36 * i);
      this.rims.push(new Dots(angle, mag));
    }
    for (let i = 0; i < this.rims.length; i++) {
      if (i == 0) {
        this.springs.push ( new Spring(this.rims[0], this.rims[this.rims.length - 1], 2));
      }else{
        this.springs.push( new Spring(this.rims[i], this.rims[i - 1], 2));
      }
      this.midSprs.push( new Spring(this, this.rims[i], 0.5));
    }
  }
  applyForce(f){
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  applyRepulsion(other){
    let dist = p5.Vector.dist(this.pos, other.pos);
    let repulsion = p5.Vector.sub(this.pos, other.pos);
    repulsion.normalize();
    mag = 0.0005 * this.mass * other.mass / dist * dist;
    repulsion.mult(mag);
    this.applyForce(repulsion);
  }
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.98);
    this.acc.mult(0);
    push();
    translate(this.pos.x, this.pos.y);
    for (let i = 0; i < this.springs.length; i++) {
      this.springs[i].spring();
      this.midSprs[i].spring();
    }
    for (let i = 0; i < this.rims.length; i++) {
      this.rims[i].update();
    }
    pop();
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    fill(255,0.01)
    noStroke();
    beginShape();
    curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
    for (let i = 0; i < this.rims.length; i++) {
      curveVertex(this.rims[i].pos.x, this.rims[i].pos.y);
    }
    curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
    curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
    endShape();
    pop();
  }
  checkBoundaries(){
    for (let i = 0; i < this.rims.length; i++) {
      let realPos = this.rims[i].getRealPos(this);
      let bounce;
      let mag = 0.5;
      if (realPos.x <= 0){
        bounce = createVector(mag, 0);
        this.rims[i].applyForce(bounce);
      }else if (realPos.x >= width) {
        bounce = createVector(-mag, 0);
        this.rims[i].applyForce(bounce);
      }
      if (realPos.y <= 0){
        bounce = createVector(0, mag);
        this.rims[i].applyForce(bounce);
      }else if (realPos.y >= height) {
        bounce = createVector(0, -mag);
        this.rims[i].applyForce(bounce);
      }
    }
  }
}

class Dots{
  constructor(angle, mag){
    this.pos = p5.Vector.fromAngle(angle, mag);
    this.vel = createVector(random(-5,5),random(-5,5));
    this.acc = createVector(0,0);
    this.mass = 1;
  }
  applyForce (f) {
    let force = f.copy();
    this.acc.add(force);
  }
  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.98);
    this.vel.limit(10);
    this.acc.mult(0);
  }
  getRealPos(parent){
    return p5.Vector.add(parent.pos, this.pos);
  }
}

class Spring {
  constructor(dot1, dot2, k) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.k = k;
    if (dot1 instanceof InkDrop) {
      this.pos1 = createVector(0,0);
    }else {
      this.pos1 = dot1.pos;
    }
    if (dot2 instanceof InkDrop) {
      this.pos2 = createVector(0,0);
    }else {
      this.pos2 = dot2.pos;
    }
    this.len = p5.Vector.dist(this.pos1, this.pos2);
  }
  spring(){
    // stroke(0,0,30);
    // strokeWeight(this.k*2);
    // line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    let vector = p5.Vector.sub(this.pos1, this.pos2);
    let distance = vector.mag();
    let heading = vector.copy().normalize();

    let stretch = distance - this.len;
    let force = heading.copy();

    force.mult(-1* this.k * 0.001 * stretch);
    this.dot1.applyForce(force);
    force.mult(-1);
    this.dot2.applyForce(force);
  }
}
