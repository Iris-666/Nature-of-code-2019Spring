function Circle(x, y, r, fixed){
  var options = {
    friction: 0,
    restitution: 0.8,
    isStatic: fixed
  }
  this.body = Bodies.circle(x, y, r,options);
  // this.body.friction =1;
  this.r = r;
  World.add(world, this.body)

  this.isOffScreen = function(){
    var pos = this.body.position;
    return(pos.y > height+100);

  }

  this.removeFromWorld = function(){
    World.remove(world, this.body)
  }

  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x,pos.y);
    rectMode(CENTER);
    // rotate(angle);
    noStroke();
    fill(255)
    ellipse(0, 0, this.r*2, this.r*4);
    // ellipse(0, 2, this.r*2, this.r*2)
    pop();
  }
}
