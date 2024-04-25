let img;
let input;
let imagine;
let res = 30;

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


function draw() {
  background(151);
  if(img){
    image(img, 0, 0, width, height);
    imagine.loadPixels();

    noStroke();
    // basic for loop structure and pixel accessing code from: https://idmnyu.github.io/p5.js-image/
    for(var y = 0; y < height; y+= res){
      for(var x = 0; x < width; x+= res){
        var index = (x + y * width) * 4;
        let c = imagine.get(x, y);
        fill(c);
        rect(x,y, res, res);
        /*
        pixels[index+0] =                   // red
        pixels[index+1] =                   // green 
        pixels[index+2] =                   // blue
        pixels[index+3] = 255;              // alpha
        */
        // pixels[index+0] = x;                  // red
        // pixels[index+1] = random(0,255);                  // green 
        // pixels[index+2] = y;                 // blue
        // pixels[index+3] = 255;              // alpha
      }
    }
    // update pixels with their new values
  }
  if(imagine){
    imagine.updatePixels();
  }

}
