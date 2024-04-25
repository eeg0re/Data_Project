let img;
let input;
let imagine;
let res = 30;
let colors;

function preload(){
  input = createFileInput(handleImage);
  input.position(150, 300);
}

function handleImage(file){
  if(file.type === 'image'){
    img = createImg(file.data, '');
    img.hide();
    imagine = loadImage(file.data);
    input.remove();
  }
  else{
    img = null;
  }
  fix_canvas();
}

function setup() {
  colors = [[50, 94, 168], [115, 163, 245], [162, 185, 224], [30, 59, 107], [4, 20, 46], [0, 0, 0]];

  if(img){
    createCanvas(img.width, img.height);
  }

  pixelDensity(1);
}

function fix_canvas(){
  if(img){
    if (width != img.width || height != img.height){
      resizeCanvas(img.width, img.height)
    }
  }
}

function closestColor(r, g, b){
  let index;
  let cor = createVector(r, g, b);
  let minDist;
  for(let i = 0; i < colors.length; i++){
    let azul = createVector(...colors[i]);
    let distance = cor.dist(azul);
    if(!minDist || distance < minDist){
      index = i;
      minDist = distance;
    }
  }

  return index;
}


function draw() {
  if(img){
    image(img, 0, 0, width, height);
    imagine.loadPixels();

    noStroke();
    // basic for loop structure and pixel accessing code from: https://idmnyu.github.io/p5.js-image/
    for(var y = 0; y < height; y+= res){
      for(var x = 0; x < width; x+= res){
        var index = (x + y * width) * 4;
        // let c = imagine.get(x, y);

        let closestIDX = closestColor(pixels[index], pixels[index+1], pixels[index+3]);
        fill(...colors[closestIDX]);

        rect(x,y, res, res);
        // pixels[index]   = colors[closestIDX][0];                  // red
        // pixels[index+1] = colors[closestIDX][1];                  // green 
        // pixels[index+2] = colors[closestIDX][2];                  // blue
        // pixels[index+3] = 255;              // alpha
      }
    }
    // update pixels with their new values
  }
  if(imagine){
    imagine.updatePixels();
  }

}
