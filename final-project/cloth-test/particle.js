
// 2D Cloth with toxiclibs
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/020-cloth3d.html
// https://youtu.be/jrk_lOg_pVA
// https://editor.p5js.org/codingtrain/sketches/U6n24GfsD

class Particle extends VerletParticle2D {
constructor(x, y) {
  super(x, y);
  this.rad = 1
}

display() {
  fill(255);
  ellipse(this.x, this.y, this.rad, this.rad);
}
drag() {
  let distance = dist(mouseX, mouseY, this.x, this.y);
  if (mouseIsPressed && distance < this.rad) {
    this.x = mouseX;
    this.y = mouseY;
  }
}

}
