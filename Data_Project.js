let img;
let input;

function preload(){
  input = createFileInput(handleImage);
  input.position(150, 300);
}

function handleImage(file){
  if(file.type === 'image'){
    img = createImg(file.data, '');
    img.crossOrigin = "Anonymous";
    img.hide();
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
    //loadPixels();
    // basic for loop structure and pixel accessing code from: https://idmnyu.github.io/p5.js-image/
    for(var y = 0; y < height; y++){
      for(var x = 0; x < width; x++){
        var index = (x + y * width) * 4;
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
  //updatePixels();

}
