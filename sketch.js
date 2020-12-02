let stars = []
let spark = ['y', 'n']
function setup() {
    setupHand();
    setupSpeech();
    setupObjects();
    createCanvas(800, 600);
    textAlign(LEFT);
    
    
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
let gif;
function preload() {
    gif = createImg("https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/source.gif");
    gif.hide();
    city = loadImage('visuals/intro/city.png');
    wind = loadImage('visuals/intro/window.png');
}

let move = false;
//general x and y = make this mvc
let y = 0;
let x = 0;
let textfade = 255;
let pose = false;
let s = 30
let done = false;
let landed = false;
function draw() { 
    background(220);
    //initial load
    //!
//    if (handposeModel && videoDataLoaded && done == false){
//        handposeModel.estimateHands(capture.elt).then(function(_hands){
//      
//            predictions = _hands;
//        })
//        done = true;
//        print('runs')
//   }
//  
//    if(done == false) {
//        gif.show();
//        background(0)
//        gif.position(width/2-gif.width/2, height/2-gif.height/2);
//        fill(255)
//        textSize(30);
//        text('Loading. . .', width/2, height/2);
//    }
//    else {
//        gif.hide();
//    }

    //!
//    if (handposeModel && videoDataLoaded && done == true){
        sceneIntro();
        
  //}
   
//update
  if(pose == true) {
      handposeModel.estimateHands(capture.elt).then(function(_hands){
        predictions = _hands;
          //Math.round(predictions[0].handInViewConfidence*1000)/1000;
        })
        drawKeypoints();
  }
}
function cursor() {
    //find middle of palm
    //grow circle
}
function infoBox(x, y, w, h, r, c, pos, p) {
    push();
    fill(0, 160)
    rect(0, 0, width, height)
    pop();
    fill(c)
    rect(x, y, w, h, r)
    //i
    push();
    noFill();
    strokeWeight(2)
    stroke(0)
    ellipse(x+30, y+30, 25)
    pop();
    push();
    fill(0);
    textSize(20)
    textFont('Courgette');
    text("i", x+28, y+37)
    pop();
    
    push();
    fill(0);
    textSize(20)
    textAlign(LEFT);
    textFont('Space Mono');
    text("Speech Recognition", x+58, y+37)
    pop();
    //arrow
    if(pos == "down") {
        beginShape();
        vertex(x+w*p, y + h + 20);
        vertex(x+w*p - 20, y + h);
        vertex(x+w*p + 20, y + h);
        endShape(CLOSE);
    }
    if(pos == "right") {
        
    }
}
function dialogueBox() {
    fill(0)
    rect(0, height * 0.82, width, height * 0.2)
}
function sceneIntro() {
    fill(0)
    text('p5.js', width/2, height/2);
        
    landing();
    if(move == true && y > -1100) {
        y -=2;
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
    textAlign(CENTER)
    text('Space Espionage', width/2, height/2);
    pop();
    
    infoBox(width * 0.1, height * 0.43, 300, 200, 8, color(240), "down", 0.2);
    dialogueBox();
    
}
function fadeText(text, s, x, y) {
    if(s == "out") {
        fill(255, textfade);
        text(text, x, y);
    }
    else {
        fill(0, textfade);
        text(text, x, y);
    }
    
}
function landing() {
    if(y > -1100) {

    }
    else {
        return true;
    }
}
function setupObjects() {
    
}
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 5; j < prediction.landmarks.length; j += 4) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      let x = map(keypoint[0], 0, capture.width, 0, 800)
      let y = map(keypoint[1], 0, capture.height, 0, 600)
      ellipse(width-x, y, 10, 10);
    }
  }
  
  for (let p = 0; p < predictions.length; p += 1) {
    const prediction2 = predictions[p];
    for (let q = 8; q < prediction2.landmarks.length; q += 4) {
      const keypoint2 = prediction2.landmarks[q];
      fill(0, 0, 255);
      noStroke();
      let x = map(keypoint2[0], 0, capture.width, 0, 800)
      let y = map(keypoint2[1], 0, capture.height, 0, 600)
      ellipse(width-x, y, 10, 10);
    }
  }
    predictions = []
}

function mousePressed() {
//    if(move == true) {
//        if(pose == false)
//            pose = true;
//        else 
//            pose = false;
//    }
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
          star.y -=2;
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
