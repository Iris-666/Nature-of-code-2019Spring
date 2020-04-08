function setup(){
  createCanvas(400,500)
  background(220);
}

function draw(){
  // background(100);

  let center = createVector(width/2,height/2);
  let mouse = new p5.Vector(mouseX,mouseY);


  mouse.sub(center);

  push();
  translate(width/2,height/2);
  strokeWeight(3);

  // let vector1 = createVector(100,0);
  // stroke(255,0,0);
  // line(0,0,vector1.x,vector1.y)
  //
  // let vector2 = createVector(0,100);
  // stroke(255,255,0)
  // line(0,0,vector2.x,vector2.y)

//non-static
  // vector1.add(vector2);//v1 += v2 the value of vector1 will change

//static
  // let vector3 = p5.Vector.add(vector1,vector2);//v3 = v1+v2

  let dist = random(0, 100);
    let angle = random(TAU); // TWO_PI
    let vec = p5.Vector.fromAngle( angle );
    vec.mult( dist );

  stroke(0,0,255);
  line(0,0,vec.x,vec.y);
  ellipse(vec.x,vec.y,10,10)
  pop();


}
