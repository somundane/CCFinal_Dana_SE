let stars = []
let spark = ['y', 'n']
let scene; //ll around scene obj
let fade; //all around fade obj
let t; //general text obj
function setup() {
    setupSpeech();
    //!
    setupHand();
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
    for(let i = 0; i < dText.length; i ++) {
        let t = {
            text: dText[i],
            show: false
        }
        dialogue.push(t)
    }
    scene = new Scene();
    fade = new Fade();
    t = new Text("", width/2-80, height/2-40, 15)
}

let move = false;
//general x and y = make this mvc
let y = 0;
let x = 0;
let textfade = 255;
let pose = false;
let s = 30
let poseinit = false;
function draw() { 
    background(220);
    print(speak)
    if(canspeak == true && speak == true) {
        print(response);
    }
    
    //initial loadModel
    //!
    if (handposeModel && videoDataLoaded && poseinit == false){
        handposeModel.estimateHands(capture.elt).then(function(_hands){
            predictions = _hands;
        })
        poseinit = true;
        print('runs')
   }
  
    if(poseinit == false) {
        gif.show();
        background(0)
        gif.position(windowWidth/2-gif.width/2, height/2-gif.height/2);
        fill(255)
        textSize(30);
        push();
        textAlign(CENTER)
        text('Loading. . .', width/2, height * 0.9);
        pop();
    }
    else {
        gif.hide();
    }

    //!
    if (handposeModel && videoDataLoaded && poseinit == true){
        if(scene.scene == 0) 
            sceneIntro()
        
    }
}
class Scene {
    //!
    constructor() {
        this.scene = 0;
        //!
        this.subscene =0;
        this.nsub = false;
        this.nscene = false;
        this.nscene = false;
    }
    nextscene() {
        if(this.nscene == false) {
            this.scene += 1;
            this.nscene = true;
        }
    }
    nextsub() {
        if(this.nsub == false) {
            this.subscene += 1;
            this.nsub = true;
        }
    }
}
function cursor() {
    //find middle of palm
    //grow circle
}
function sceneIntro() {
    if(scene.subscene >= 0 && scene.subscene < 2) {
        fill(0)
        text('p5.js', width/2, height/2);

        if(move == true && y > -1100) {
            //!
            y -=20;
            x = random(-1, 1)
            textfade -=10;
        }
        //-1100
        image(city, x, y)
        makeStars(x);
        //add ligtinhg effects?
        image(wind, 0, 0)
        if(scene.subscene == 0 && y <= -1100) {
            scene.nsub == false;
            fade = new Fade();
            scene.nextsub();
        }
        push();
        fill(255, textfade);
        textSize(30);
        textAlign(CENTER)
        text('Space Espionage', width/2, height/2);
        pop();
        
        if(scene.subscene == 1) {
            if(fade.state == "out")
                fade.fadeIn(20);
            infoBox(info[0], "Speech recognition", width * 0.03, height * 0.43, 300, 200, 8, "down", 0.13, fade.start);
            dialogueTrue(0, 0);
            dialogueBox(fade.start);
            activateIcon("speech", fade.start);
            if(speak == true) {
                if(response == "where am I") {
                    if(fade.state == "in")
                        fade.fadeOut(10);
                    if(fade.start < 0) {
                        scene.nsub = false;
                        scene.nextsub();
                        fade = new Fade();
                    }
                }
            } 
        }
    }
    if(scene.subscene == 2) {
        image(city, 0, -1100)
        image(wind, 0, 0)
        fade.fadeIn(10);
        push();
        tint(255, fade.start)
        image(plane, 0, 0)
        image(scan, 0, 0)
        pop();
        
        //please scan
        //popup
        if(fade.state == "in"){
            pose = true;
        }
          if(pose == true) {
              handposeModel.estimateHands(capture.elt).then(function(_hands){
                predictions = _hands;
                  //Math.round(predictions[0].handInViewConfidence*1000)/1000;
                })
                drawPhone();
//              drawKeypoints();
          }
    }
    //phone
    if(scene.subscene == 3) {
        textFont('Poppins')
        textSize(15);
        image(plane, 0, 0)
        image(scan, 0, 0)
        fade.fadeIn(10);
        
        push()
        rectMode(CENTER)
        let f = map(fade.start, 0, 255, 0, 200)
        fill(0, f)
        rect(width/2, height/2, width, height)

        tint(255, fade.start)
        image(phone2, 0, 0)
        pop()
        if(fade.state == "in") {
            if(speak==true) {
                t.reset(0);
                t.clear();
                t.setText(phonetalk[1]+response)
                t.show();
            }
            else {
                t.setText(phonetalk[0])
                t.show()
            }
        }
    }
}
let phonetalk = ["This is the arrival check-in \nportal.\n\nPlease state your name \nto verify your identity.", "Did you say your name was: \n","then more"]

let scanhit, hashit = false, time;
function drawPhone() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];

        const keypoint = prediction.landmarks[10];
        fill(255, 150, 0);
        noStroke();
        let x = map(keypoint[0], 0, capture.width, 0, 800)
        let y = map(keypoint[1], 0, capture.height, 0, 600)
        //ellipse(width-x, y, 30)
        
        push();
        var scale = 0.5;
        imageMode(CENTER)
      image(phone, width-x, y, scale*width, scale*phone.height*width/phone.width)
//        push()
//        rectMode(CORNER)
//        fill(255)
//        rect(220, 15, 40, 40)
//        rect(width-x-40, y-90, 80, 180)
//        pop()
        pop();
      
      
      scanhit = collideRectRect(220, 15, 40, 40, width-x-40, y-90, 80, 180);
      
      if(scanhit) {
          print('HIT')
        if(hashit == false) {
          time = millis();
          hashit = true;
        }
        if(millis() - time < 2000) {
          let s = map(millis()-time, 0, 2000, 0, 40)
          push()
          fill(255)
          ellipse(width-x, y + 15,s)
          pop()
        }
        if(millis() - time > 2000) {
            ellipse(width-x, y,40)
            speak = false;
            scene.nsub = false;
            scene.nextsub();
            fade = new Fade();
        }
      }
      else{
          hashit = false;
      }
      
        predictions = [];
  }
}


class Fade {
    constructor() {
        this.start = 0;
        this.end = 255;
        this.state = "out";
    }
    fadeIn(val) {
        if(this.start < this.end)
            this.start += val;
        else
            this.state = "in"
    }
    fadeOut(val) {
            this.start -= val;
    }
    fadedIn() {
        if(this.start >= 255)
            return true;
        else
            return false;
    }
    fadedOut() {
        if(this.start <= 0)
            return true;
        else
            return false;
    }
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
    predictions = [];
}

function mousePressed() {
//    if(move == true) {
//        if(pose == false)
//            pose = true;
//        else 
//            pose = false;
//    }
if(handposeModel && videoDataLoaded && poseinit == true)
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
          //!
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
    this.time = 0;
      this.id = 0;
  }
  setText(str) {
    this.text = str;
    this.length = str.length;
  }
  reset(id) {
      if(this.count >= this.length && this.id ==id) {
        this.count = 0;
          this.id +=1;
      }
  }
  show() {
    if(millis() - this.time > this.ms) {
      this.time = millis();
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

//class InfoText{
//    constructor(str) {
//        this.shown = false;
//        this.text = str;
//        this.length = str.length;
//        this.count = 0;
//        this.ms = ms;
//        this.x = x;
//        this.y = y;
//    }
//}
