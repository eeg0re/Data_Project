let img;
let input;
let imagine;
let res = 30;
let colors;
let DarkBlue, LightBlue;

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
  fixCanvas();
}

function setup() {
  input = createFileInput(handleImage);
  input.position(150, 300);

  // establish the colors we want for our palette
  colors = [[50, 94, 168], [115, 163, 245], [162, 185, 224], [30, 59, 107], [4, 20, 46], [0, 0, 0]];
  // establish the range of colors for our palette 
  DarkBlue = color(2, 12, 28);
  LightBlue = color(215, 227, 255);

  // set a default size for the canvas
  createCanvas(500, 500);

  // set the pixel density to 1
  pixelDensity(1);
}

function fixCanvas(){
  if(img){
    if (width != img.width || height != img.height){
      resizeCanvas(img.width, img.height)
      background(255, 50, 50)
    }
  }
}

function draw() {
  if(imagine){
    image(imagine, 0, 0, width, height);
    imagine.loadPixels();

    noStroke();
    // basic for loop structure and pixel accessing code from: https://idmnyu.github.io/p5.js-image/
    for(var y = 0; y < height; y+= res){
      for(var x = 0; x < width; x+= res){
        // get the current pixel's color and brightness
        let c = imagine.get(x, y);
        let bright = brightness(c);
        
        let normalizedBright = map(bright, 0, 100, 0, 1);     // normalize the brightness
        
        let colore = lerpColor(DarkBlue, LightBlue, normalizedBright);      // choose a color based on the normalized brightness
        
        fill(colore);             // fill the rectangle that new color
        rect(x,y, res, res);      // draw the square using the color we found
      }
    }
    // update pixels with their new values
    imagine.updatePixels();
  }


}
