var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];
var ground;


function setup(){
  createCanvas(windowWidth,windowHeight);
  noCursor();
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  console.log(width);

  // boundaries.push(new Boundary(800, 500, width*0.3, 20, -PI/6))
  // boundaries.push(new Boundary(250, 300, width*0.6, 20, PI/7))
  boundaries.push(new Boundary(width/2, height/2 +10, 200, 20, 0))


}

function mouseDragged(){
  circles.push(new Circle(mouseX, mouseY, random(1,3)))
}

function draw(){
  background(0);
  for(let i = 0; i<circles.length;i++){
    circles[i].show();
    if(circles[i].isOffScreen()){
      circles[i].removeFromWorld();
      circles.splice(i, 1);
      i--;
    }
  }
  for(var i = 0; i < boundaries.length; i++){
    // boundaries[i].show();
  }

  stroke(255);
  strokeWeight(1);
  line(width/2 - 100, height/2, width/2 + 100, height/2)

}
