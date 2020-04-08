function setup() {
  createCanvas(400, 400);
  background(50);
}

function draw() {
  background(0, 40);
  push();
  blendMode(ADD);

  translate(width/2, height/2);

  let freq, amp;
  let x, y, dia;

//debug
  // stroke(255,0,0);
  // noFill();

//normal display
  noStroke();
  fill(102,186,183,10);

  circleDia = 100;

  for (let i = 0; i<10; i++){
    freq = frameCount * (0.01 + i*0.01);
    amp = 10 + i*2;
    x = cos(freq) * amp;
    y = sin(freq) * amp;
    dia = sin(freq) * amp;
    circleDia = 100+i*2
    ellipse(x,y,circleDia+dia,circleDia+dia);

  }

  freq = frameCount * 0.01;
  amp = 10;
  x = cos(freq) * amp;
  y = sin(freq) * amp;
  dia = sin(freq) * amp;
  ellipse(x,y,circleDia+dia,circleDia+dia);

  freq = frameCount * 0.015;
  amp = 13;
  x = cos(freq) * amp;
  y = sin(freq) * amp;
  dia = sin(freq) * amp;
  ellipse(x,y,circleDia+dia,circleDia+dia);

  freq = frameCount * 0.008;
  amp = 8;
  x = cos(freq) * amp;
  y = sin(freq) * amp;
  dia = sin(freq) * amp;
  ellipse(x,y,circleDia+dia,circleDia+dia);

  freq = frameCount * 0.02;
  amp = 20;
  x = cos(freq) * amp;
  y = sin(freq) * amp;
  dia = sin(freq) * amp;
  ellipse(x,y,circleDia+dia,circleDia+dia);

  freq = frameCount * 0.012;
  amp = 15;
  x = cos(freq) * amp;
  y = sin(freq) * amp;
  dia = sin(freq) * amp;
  ellipse(x,y,circleDia+dia,circleDia+dia);



  pop();
}
