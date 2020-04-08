console.log("Script Reload!");

let canvasWidth, canvasHeight;
let offsetX, offetY;

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  canvasWidth = windowWidth * 3;
  canvasHeight = windowHeight * 3;

  offsetX = 200;
  offsetY = 200;

  for (let i=0; i<200; i++) {
    circles.push( new Circle(random(canvasWidth), random(canvasHeight)) );
  }

}


function draw() {
  background(0);

  // let's create a scroll feature
  let spd = 10;
  if (mouseX < 100) {
    offsetX -= spd;
  }
  else if (mouseX > windowWidth - 100) {
    offsetX += spd;
  }
  if (mouseY < 100) {
    offsetY -= spd;
  }
  else if (mouseY > windowHeight - 100) {
    offsetY += spd;
  }
  // limit the offset values
  offsetX = constrain(offsetX, 0, canvasWidth - windowWidth);
  offsetY = constrain(offsetY, 0, canvasHeight - windowHeight);

  // translate to the offset position
  translate(-offsetX, -offsetY);
  console.log(offsetX, offsetY);


  /*
    add your sketch from here
  */

  for (let i=0; i<circles.length; i++) {
    circles[i].display();
  }
}



// resize the canvas by reloading the webpage when the dimentions of the window is changed.
window.addEventListener("resize", pageReload);
function pageReload() {
  location.reload();
}



class Circle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.dia = random( 10, 200 );
  }
  display() {
    stroke(255);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.dia, this.dia);
  }
}











// :D
