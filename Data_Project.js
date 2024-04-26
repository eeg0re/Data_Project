let img;
let input;
let imagine;
let res = 30;
let colors;
let color1, color2;

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
  // set a default size for the canvas
  createCanvas(500, 500);
  //background(255);
  textSize(30);
  fill(0);
  stroke(0);
  strokeWeight(4);

  //textAlign('CENTER');
  let message = 'Some browsers have issues displaying the image you upload. If this happens, reload the browser and try uploading the image again';
  text(message, 150, 0);

  // establish the range of colors for our palette 
  // ------------------------ blues -------------------------------
  // color1 = color(2, 12, 28);
  // color2 = color(120, 140, 255);
  // ------------------------ greens ------------------------------
  // color1 = color(5, 33, 2);
  // color2 = color(209, 255, 204);
  // ------------------------ purples -----------------------------
  color1 = color(23, 2, 41);
  color2 = color(225, 211, 237);

  // set the pixel density to 1
  pixelDensity(1);
}

function fixCanvas(){
  if(img){
    if (width != img.width || height != img.height){
      resizeCanvas(img.width, img.height)
    }
  }
}

function draw() {
  //background(255);
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
        
        let colore = lerpColor(color1, color2, normalizedBright);      // choose a color based on the normalized brightness
        
        fill(colore);             // fill the rectangle that new color
        rect(x,y, res, res);      // draw the square using the color we found
      }
    }
    // update pixels with their new values
    imagine.updatePixels();
  }


}
