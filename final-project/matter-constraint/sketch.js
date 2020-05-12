var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint

var engine;
var world;
var circles = [];
var boundaries = [];
var mConstraint;
console.log(window.innerWidth);

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight);
  background(0);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  noCursor();

  var prev = null;
  for(var a = 0; a<= 10; a+=1){
  // for(var x = 100; x <= 800; x+=10){
    for(var b = 0; b <= 60; b+=1){
      var x =   10*b + 100
      var y = 400 + 50*a
    var fixed = false;
    if(!prev || x == 700){
      fixed = true;
    }
    var p = new Circle(y, x, 4, fixed);
    circles.push(p)

    if(prev){
    var options = {
      bodyA: p.body,
      bodyB: prev.body,
      pointA:{
        x: 0,
        y: 0
      },
      length: 4,
      stiffness: 0.99
    }

    var constraint = Constraint.create(options)
    World.add(world, constraint)
  }
    prev = p;
  }
  prev = null;
}
  // boundaries.push(new Boundary(width/2, height, width, 20, 0))
  // p1 = new Circle(200, 100, 20);
  // p2 = new Circle(100, 150, 10)
  // circles.push(p1)
  // circles.push(p2)
  var canvasmouse = Mouse.create(canvas.elt)
  canvasmouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasmouse,
    constraint: {
        stiffness: 0.2
      }

  }
  mConstraint = MouseConstraint.create(engine, options)
  World.add(world, mConstraint)
}

// function mouseDragged(){
//   circles.push(new Circle(mouseX, mouseY, random(1,5)))
// }

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
    boundaries[i].show();
  }

  // if(mConstraint.body){
  //   var pos = mConstraint.body.position;
  //   fill(0,255,0);
  //   ellipse(pos.x,pos.y,20,20);
  // }

  //line(circles[0].body.position.x,circles[0].body.position.y,circles[1].body.position.x,circles[1].body.position.y)

}
