function setup() {
  createCanvas(400, 400);
  background(0);
}


function draw(){
  background(0);

    angleMode(DEGREES)
  push();
  translate(width/2,height/2);

for(r=90; r<120; r++){
  mapValue = map(r,90,120,7,1)
  for(i = 0; i<mapValue;i++){
  n = random(0,360)
  x = sin(n)*r;
  y = cos(n)*r;
  noStroke();
  fill('white');

  ellipse(x,y,random(1,3),random(1,3))
}
}
  pop();

}

// function draw(){
//   background(0);
//
//     angleMode(DEGREES)
//   push();
//   translate(width/2,height/2);
//
//     for(i = 0; i < 360; i++){
//       x = sin(i)*random(90,110);
//       y = cos(i)*random(90,110);
//       console.log(x,y);
//       noStroke();
//       fill('white');
//       ellipse(x,y,random(1,3),random(1,3));
//   }
//
//
//   pop();
//
// }
