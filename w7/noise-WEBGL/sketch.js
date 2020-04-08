function setup() {
  createCanvas(500, 500, WEBGL);
  background(0);
}

function draw() {
  background(0);

  rotateX(PI/3);
  rotateZ(frameCount * 0.01)
  let resolution = 15;
  for(let y=0;y<height;y+=resolution){
    for(let x=0;x<width;x+=resolution){

      let freq;
      freqX = (x+frameCount) * 0.01;
      freqY = (y+frameCount) * 0.01;

      let value = map(noise(freqX, freqY),0,1,0,255);

      newX = map(x, 0, width, -width/2, width/2);
      newY = map(y, 0, height, -height/2, height/2);
      noStroke();
      fill(value);

      push();
      translate(newX,newY,value*0.2);
      box(resolution/2)
      pop();

    }
  }
}
