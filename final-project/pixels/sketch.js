// var video;

function setup() {
  pixelDensity(1);
  createCanvas(600, 400);
  // video = createCapture(VIDEO);
  // video.size(600,400);
  cols = width;
  rows = height;
}

function draw() {
  loadPixels();

  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      var index = (x + y * width)*4;
      pixels[index + 0] = noise(frameCount+1000)*255;
      pixels[index + 1] = noise(frameCount+100)*255;
      pixels[index + 2] = noise(frameCount)*255;
      pixels[index + 3] = noise(frameCount)*255;
    }
  }
  updatePixels();
}
