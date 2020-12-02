let stars = []
let spark = ['y', 'n']
function setup() {
    setupHand();
    setupSpeech();
    frameRate(30);
    createCanvas(800, 600);
    textAlign(CENTER);
    
    
    //Star Setup
  for (let j = 0; j < 200; j++) {
    let star = {
      x: random(width/2 - 250, width/2 + 250),
      y: random(0, 1100),
      size: random(1, 5),
      spark: random(spark)
    }
    stars.push(star);
  }
}

//Intro
let city, wind;
function preload() {
  city = loadImage('visuals/intro/city.png');
  wind = loadImage('visuals/intro/window.png');
}

let move = false;
//general x and y = make this mvc
let y = 0;
let x = 0;
let textfade = 255;
let pose = false;
function draw() { 
    background(220);
    textFont('Inconsolata');
    fill(0)
    text('p5.js', width/2, height/2);
    
    if(move == true && y > -1100) {
        y -=20;
        x = random(-1, 1)
        textfade -=10;
    }
    //-1100
    image(city, x, y)
    makeStars(x);
    
    //add ligtinhg effects?
    image(wind, 0, 0)
    
    push();
    fill(255, textfade);
    textSize(30);
    text('Space Espionage', width/2, height/2);
    pop();
    
    if(pose == true) {
        handpose.on("predict", results => {
        predictions = results;
        });
        drawKeypoints();
    }

}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 5; j < prediction.landmarks.length; j += 4) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(width-keypoint[0], keypoint[1], 10, 10);
    }
  }
  
  for (let p = 0; p < predictions.length; p += 1) {
    const prediction2 = predictions[p];
    for (let q = 8; q < prediction2.landmarks.length; q += 4) {
      const keypoint2 = prediction2.landmarks[q];
      fill(0, 0, 255);
      noStroke();
      ellipse(width-keypoint2[0], keypoint2[1], 10, 10);
    }
  }
    predictions = []
}

function mousePressed() {
    move = true;
}

function makeStars(x) {
  for (let i = 0; i < stars.length; i++) {
    noStroke();
    fill(255, 200);
    let star = stars[i];
    if (star.spark == "y")
      ellipse(star.x, star.y, star.size + random(0, 1))
    else
      ellipse(star.x, star.y, star.size)
      
      if(move == true) {
          star.y -=20;
          star.x += x;
      }
  }
}



class Text {
  constructor(str, x, y, ms) {
    this.original = str;
    this.text = str;
    this.length = str.length;
    this.count = 0;
    this.ms = ms;
    this.x = x;
    this.y = y;
  }
  setText(str) {
    this.text = str;
  }
  reset() {
    this.count = 0;
  }
  show() {
    if(millis() - time > this.ms) {
      time = millis();
      this.count +=1
    }
    let p = this.text.substring(0, this.count);
    text(p, this.x, this.y);
  }
  clear() {
    this.text = "";
  }
  hasShown() {
    if(this.count >= this.length) {
      return true;
    }
  }
}
