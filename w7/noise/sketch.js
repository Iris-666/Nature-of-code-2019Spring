function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {
  // background(0);
  let resolution = 5;
  for(let y=0;y<height;y+=resolution){
    for(let x=0;x<width;x+=resolution){

      let freq;
      freqX = (x+frameCount) * 0.01;
      freqY = (y+frameCount) * 0.01;

      let value = map(noise(freqX, freqY),0,1,0,255);
      noStroke();
      fill(value);

      rect(x,y,resolution,height)
    }
  }
}
