class Scene {
    //!
    constructor() {
        this.scene = 0;
        this.subscene =0;
        this.nsub = false;
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

function nextSubscene() {
    scene.nsub = false;
    scene.nextsub();
}
function nextScene() {
    scene.nscene = false;
    scene.nextscene();
}
function typeText(str, id) {
    //id + 1 = reset
    if(t.id != (id + 1)) {
        t.id = id;
    } else { 
        t.clear();
        t.setText(str);
        t.show(); 
    }
}
class Timer {
    constructor() {
        this.start = false;
        this.time = 0;
    }
    count(ms) {
        if(this.start == false) {
            this.time = millis()
            this.start = true;
        }
        else {
            if(millis() - this.time > ms) {
                return true;
            }
            else {
                return false;
            }
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
    this.re = true;
  }
  setText(str) {
    this.text = str;
    this.length = str.length;
  }
  reset(id) {
      if(this.count >= this.length && this.id == id) {
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
    
class Sound {
    constructor() {
        this.play = false;
    }
    playOnce(sound) {
        if(!sound.isPlaying() && this.play == false) {
            sound.play();
            this.play = true;
        } 
    }
}


///////////////SCENE 1//////////////////////////////

let grab = false;
let poly = [];
let hit;
function checkGrab(x, y, w, h) {
      for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
          fill(255, 0, 0)
  poly[0] = createVector(width-prediction.landmarks[8][0], prediction.landmarks[8][1]);
  poly[1] = createVector(width-prediction.landmarks[5][0], prediction.landmarks[5][1]);
  poly[2] = createVector(width-prediction.landmarks[17][0], prediction.landmarks[17][1]);
  poly[3] = createVector(width-prediction.landmarks[20][0], prediction.landmarks[20][1]);
  hit = collideRectPoly(x, y, w, h, poly);
    if(prediction.landmarks[8][1] > prediction.landmarks[5][1]) {
      grab = true;
    }
    else {
      grab = false;
    }
  }
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 4; j < prediction.landmarks.length; j += 4) {
      const keypoint = prediction.landmarks[j];
      fill(200, 150, 150);
      noStroke();
      let x = map(keypoint[0], 0, capture.width, 0, 800)
      let y = map(keypoint[1], 0, capture.height, 0, 600)
      ellipse(width-x, y, 14);
    }
  } 
  for (let p = 0; p < predictions.length; p += 1) {
    const prediction2 = predictions[p];
    for (let q = 5; q < prediction2.landmarks.length; q += 4) {
      const keypoint2 = prediction2.landmarks[q];
      fill(150, 150, 200);
      noStroke();
      let x = map(keypoint2[0], 0, capture.width, 0, 800)
      let y = map(keypoint2[1], 0, capture.height, 0, 600)
      ellipse(width-x, y, 7);
    }
  }
//   predictions = [];
}

///////////////SCENE 2//////////////////////////////

let k9sound = new Sound();
function k9speak(str, id) {
    k9sound.playOnce(radio)
    fill(0)
        rect(160, height*0.86, width, 50)
        push()
        fill(255)
        textSize(20)
        textAlign(LEFT);
        textFont('Poppins');
        text(str, 170, height*0.92)
    pop()
}

///////////////SCENE 3//////////////////////////////