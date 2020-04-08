
let params = {
  speed: 0.01,
  amp:40,
  noiseValue:10
}

const gui = new dat.GUI();

gui.add(params, 'speed', 0.01, 0.05)
gui.add(params, 'amp', 5,80);
gui.add(params, 'noiseValue', 0,100);



function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(windowWidth, windowHeight);

  background(0);
}

function draw() {
  background(0);

  // let adj = map(mouseY, 0, windowHeight, 1.3, 5.0);
  let adj = 2
  push();
  blendMode(ADD);
 wave(height/2 - 12, 0.021, adj-0.1,200, 110, 50);
 wave(height/2 - 12, 0.02, adj-0.1,200, 110, 50);

 wave(height/4 - 12, 0.02, adj-0.1,102,186,183);

 wave(height/1.3 - 12, 5, adj-0.1,102,186,183);


pop();
}

function wave(yOffset, adjFreq, adjAmp,r,g,b){
  let freq; //time, angle (+ position)
  let amp; //radDistance


for(let x= 0;x < width; x+=2){

  freq = x * 0.005 + frameCount * params.speed;
  freqX = (x+frameCount) * 0.01;
  let value = map(noise(freqX),0,1,0,params.noiseValue);
  amp = params.amp + value;
  sinForAmp = sin(freq) * amp;

  freq = frameCount * 0.01;
  amp = 3;
  sinForFreq = sin(freq) * amp;


  freq = x * 0.5 + frameCount * adjFreq ;
  amp = (10 + sinForAmp) * adjAmp;
  let sinValue = sin(freq) * amp;

  let y = yOffset + sinValue;

  let dia = random(3,7)
  noStroke();
  fill(r,g,b);
  ellipse(x,y,dia,dia)
}
}
