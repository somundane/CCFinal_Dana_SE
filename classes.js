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