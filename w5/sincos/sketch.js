function setup() {
  createCanvas(400, 400);
  background(240);
}

function draw() {
  // background(0);
  push();

  let freq, amp;

  // freq = radians(frameCount * 1.5);
  // amp = 80;
  // noiseValueForAmp = noise(freq) * amp;

  freq = radians(frameCount * 1.5);
  amp = 50;
  sinValueForAmp = sin(freq) * amp;

  freq = radians(frameCount * 0.3); //frameCount * 0.05; // time, angle
  amp = 100 + sinValueForAmp ; // amp & radDist
  let sinValue = sin(freq) * amp;
  let cosValue = cos(freq) * amp;

  let x = width/2;
  let y = height/2 + sinValue;

  noStroke();
  fill(255, 0, 0);
  //ellipse(x, y, 10, 10);

  x = width/2 + cosValue;
  y = height/2;
  fill(255, 255, 0);
  //ellipse(x, y, 10, 10);

  x = width/2 + cosValue;
  y = height/2 + sinValue;
  fill(255, 0, 255);
  //ellipse(x, y, 30, 30);

  stroke(0, 30);
  fill(0);
  line(width/2, height/2, x, y);
  ellipse(x, y, 1, 1);

  pop();
}
