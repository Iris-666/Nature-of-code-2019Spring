var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

var mouseX,mouseY
  document.addEventListener('mousemove',function(event){
    mouseX = event.clientX
    mouseY = event.clientY
  })


// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var group = Body.nextGroup(true),
    particleOptions = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }},
    constraintOptions = { stiffness: 0.6 },
    cloth = Composites.softBody(100, 100, 50, 12, 5, 5, false, 2, particleOptions, constraintOptions);

// for (var i = 0; i <=4; i++) {
    cloth.bodies[0].isStatic = true;
    // cloth.bodies[cloth.bodies.length-1-i].isStatic = true;
// }
    cloth.bodies[49].isStatic = true;
    cloth.bodies[cloth.bodies.length - 1].isStatic = true;
    cloth.bodies[cloth.bodies.length - 50].isStatic = true;


World.add(world, [
    cloth
    // Bodies.circle(300, 500, 80, { isStatic: true }),
    // Bodies.rectangle(500, 480, 80, 80, { isStatic: true }),
    // Bodies.rectangle(400, 609, 800, 50, { isStatic: true })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.98,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});
