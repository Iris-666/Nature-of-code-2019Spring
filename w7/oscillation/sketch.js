function setup() {
  createCanvas(700, 500);
  background(0);
}

function draw() {
  background(0);

  let adj = map(mouseY, 0, height, 0.1, 2.0);
  push();
  blendMode(ADD);
 wave(height/2 - 12, 0.019, adj-0.1);
 wave(height/2 + 0, 0.02, adj)
 wave(height/2 + 30, 0.022, adj+0.2)
pop();
}

function wave(yOffset, adjFreq, adjAmp){
  let freq; //time, angle (+ position)
  let amp; //radDistance

for(let x= 0;x < width; x+=3){

  freq = x * 0.005 + frameCount * 0.01;
  amp = 40;
  sinForAmp = sin(freq) * amp;

  freq = frameCount * 0.01;
  amp = 3;
  sinForFreq = sin(freq) * amp;


  freq = x * adjFreq + frameCount * adjFreq + sinForFreq;
  amp = (10 + sinForAmp) * adjAmp;
  let sinValue = sin(freq) * amp;

  let y = yOffset + sinValue;

  let dia = random(1,5)
  noStroke();
  fill(200, 110, 50);
  ellipse(x,y,dia,dia)
}
}
