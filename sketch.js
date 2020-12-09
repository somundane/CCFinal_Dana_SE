let stars = []
let spark = ['y', 'n']
let scene, convo; //ll around scene/convo obj
let fade; //all around fade obj
let t; //general text obj
let timer; //general timer 
let handposeloaded = false;
function setup() {
    setupSpeech();
    //!
    //setupHand();
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
    convo = new Scene();
    fade = new Fade();
    t = new Text("", width/2-80, height/2-40, 15)
    timer = new Timer();
    
    
    //!
    scene.subscene = 5
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
    //print(speak)
    if(canspeak == true && speak == true) {
        print(response);
    }
    
    //initial loadModel
    //!
//    if (handposeModel && videoDataLoaded && poseinit == false){
//        handposeModel.estimateHands(capture.elt).then(function(_hands){
//            predictions = _hands;
//        })
//        if(timer.count(800)) {
//            poseinit = true;
//            timer = new Timer();
//        }
//        print('runs')
//   }
//  
//    if(poseinit == false) {
//        gif.show();
//        background(0)
//        gif.position(windowWidth/2-gif.width/2, height/2-gif.height/2);
//        fill(255)
//        textSize(30);
//        push();
//        textAlign(CENTER)
//        text('Loading. . .', width/2, height * 0.9);
//        pop();
//    }
//    else {
//        gif.hide();
//    }

    //!
//    if (handposeModel && videoDataLoaded && poseinit == true){
        if(scene.scene == 0) 
            sceneIntro();
        if(scene.scene == 1)
            sceneChapOne();
        
//    }
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
let user;
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
            fade = new Fade();
            nextSubscene();
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
            infoBox(info[0], "Speech recognition", width * 0.03, height * 0.43, 300, 200, 8, "down", 0.13, fade.start, true);
            dialogueTrue(1, 1);
            dialogueBox(fade.start);
            activateIcon("speech", fade.start);
            if(speak == true) {
                if(response.includes("where am I")) {
                    if(fade.state == "in")
                        fade.fadeOut(10);
                    if(fade.start < 0) {
                        nextSubscene();
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
            push()
            fill(255)
            textSize(28)
            textFont('Roboto Mono')
            text('Scan code upon arrival.', width*0.35, height*0.08)
            pop()
        pop();
        if(fade.state == "in" && scene.subscene == 2) {
            nextSubscene();
            fade = new Fade();
            print('this runs')
        }
    }
        if(scene.subscene == 3) {
            image(plane, 0, 0)
            image(scan, 0, 0)
            push()
            fill(255)
            textSize(28)
            textFont('Roboto Mono')
            text('Scan code upon arrival.', width*0.35, height*0.08)
            pop()
                fade.fadeIn(10);
                infoBox(info[1], "Gesture Control", width * 0.03, height * 0.43, 300, 200, 8, "down", 0.13, fade.start, false);
                dialogueTrue(2, 2);
                dialogueBox(fade.start);
                activateIcon("hand", fade.start);
                
                //please scan
                //popup
                if(fade.state == "in"){
                    pose = true;
                }
                if(pose == true) {
                    if(handposeloaded == false) {
                        push()
                        translate(10, height*0.85)
                        textSize(12)
                        fill(100, 0, 0)
                        rect(width*0.8, height*0.05, 120,30)
                        fill(255)
                        text("Please Wait", 660, height*0.08)
                        pop()
                    }                handposeModel.estimateHands(capture.elt).then(function(_hands){
                predictions = _hands;
                   print(predictions) //Math.round(predictions[0].handInViewConfidence*1000)/1000;
                    if(predictions.length == 0) {
                        //let user know
                        push()
                        translate(10, height*0.85)
                        textSize(12)
                        fill(100, 0, 0)
                        rect(width*0.8, height*0.05, 120,30)
                        fill(255)
                        text("No Hand Found", 660, height*0.08)
                        pop()
                    }
                    else handposeloaded = true;
                })
                    drawPhone();
//                  drawKeypoints();
                }

        }
    //phone
    if(scene.subscene == 4) {
        textFont('Poppins')
        textSize(15);
        image(plane, 0, 0)
        image(scan, 0, 0)
        push()
        fill(255)
        textSize(28)
        textFont('Roboto Mono')
        text('Scan code upon arrival.', width*0.35, height*0.08)
        pop()
        fade.fadeIn(20);
        
        push()
        rectMode(CENTER)
        let f = map(fade.start, 0, 255, 0, 200)
        fill(0, f)
        rect(width/2, height/2, width, height)
        activateIcon("speech", fade.start);
        tint(255, fade.start)
        image(phone2, 0, 0)
        pop()
        if(fade.state == "in") {
            if(speak==true) {
                let name;
//                t.clear();               
//                t.setText(phonetalk[1]+name[0]+" is that correct?")
//                t.show();
                if(!response.includes("yes") && !response.includes("no")) {
                    t.reset(2);
                    name = split(response, " ");
                    typeText(phonetalk[1]+name[0]+" is that correct?", 2)
                    user = name;
                }

                if(response.includes("yes")){
                    t.reset(4);
//                    t.clear();
//                    t.setText("Voice recognized. \nYour identity has been verified. \n\nName: "+name[0]"\nTrip Duration: Indefinite\n\nWelcome to Metropolis 612!")
//                    t.show();
                    typeText("Voice recognized. \nIdentity verified. \n\nName: "+user+"\nTrip Duration: Indefinite\n\nWelcome to Metropolis 612!", 4);
                    if(t.count >= t.length && t.id >= 5) {
                        t.re = false;
                        if(timer.count(2000)) {
                            fade.fadeOut(10);
                        }
                        if(fade.fadedOut()) {
                            fade = new Fade();
                            timer = new Timer();
                            response = "";
                            nextSubscene();
                        }
                        }                        
                    }
                }
                else if(response.includes("no")) {
                    t.reset(6);
                    typeText("Please re-state your name.", 6);
                }
            }
            else {
                t.reset(0);
//                t.setText(phonetalk[0])
//                t.show()
                typeText(phonetalk[0], 0);
            }
        }
    }
    if(scene.subscene == 5) {
        if(fade.state != "in") {
            image(plane, 0, 0)
            image(scan, 0, 0)
            push()
            fill(255)
            textSize(28)
            textFont('Roboto Mono')
            text('Scan code upon arrival.', width*0.35, height*0.08)
            pop()
        }
        if(fade.state == "out")
            fade.fadeIn(20);
        push();
        tint(255, fade.start)
        image(exit, 0, 0)
        pop();
        print(response)
        if(spoken == false) {
            infoBox(info[2], "Conversation", width * 0.1, height * 0.18, 300, 170, 8, "right", 0.2, fade.start, false);
            image(speechright, 420, 120)
        }
        dialogueTrue(0,0);
        dialogueBox(fade.start);
        activateIcon("speech", fade.start);
        speechright.resize(500, 0)
        let s5 = []
        if(fade.state == "in") {
            if(speak==true) {
                if((response.includes("hello") || response.includes("hi") || response.includes("hey"))) {
                    convo.nextsub();
                    print(convo.subscene)
                    spoken = true;
                }
            }
            if(convo.subscene == 1) {
                talk("Hey there. Is there anything\nI can help you with?", width*0.3, height*0.1, 200, 80, "r")
                dialogueTrue(3,3);
                dialogueBox(255);
                if(response.includes("where can I") || response.includes("a ride")|| response.includes("where can I get a ride")) {
                    convo.nsub = false;
                    response = ""
                    convo.nextsub();
                }
            }
            if(convo.subscene == 2) {
                talk("It depends. Are you looking \nto ride a train or a cab?", width*0.3, height*0.1, 200, 80, "r")
                dialogueTrue(4, 4);
                dialogueBox(255);
                if(response != "") {
                    if(response.includes("train")) {
                        response = ""
                        convo.subscene = 4;
                    }  
                    else if(response.includes("cab")||response.includes("taxi")) {
                        response = ""
                        convo.subscene = 3;
                    }
                    else {
                        response = ""
                        convo.subscene = 5;
                    }  
                }
            }
            if(convo.subscene == 3) {
                talk("Turn left as you exit and\nyou'll find the cabs and\n\nwaiting area there.", width*0.3, height*0.1, 200, 90, "r")
                dialogueTrue(6, 6);
                dialogueBox(255);
                if(response != "") { if(response.includes("thank you")||response.includes("thanks")) {
                        response = ""
                        convo.subscene = 6;
                    } 
                }
            }
            if(convo.subscene == 4) {
                talk("The trains are undergoing\nheavy maintenance now.\n\nThis storyline is not available \nyet ;) better take a cab.", width*0.3, height*0.1, 200, 100, "r")
                dialogueTrue(5, 5);
                dialogueBox(255);
                if(response != "") { if(response.includes("cab")||response.includes("taxi")||response.includes("it is")) {
                        response = ""
                        convo.subscene = 3;
                    } 
                }
                
            }
            if(convo.subscene == 5) {
                talk("I'm sorry. I don't think\nwe have that type of\ntransportation.\n\nI can only give you info on\neither cabs or trains.", width*0.3, height*0.1, 200, 120, "r")
                dialogueTrue(4, 4);
                dialogueBox(255);
                if(response != "") {
                    if(response.includes("train") || response.includes("trains")) {
                        response = ""
                        convo.subscene = 4;
                    }  if(response.includes("cab")||response.includes("Taxi")) {
                        response = ""
                        convo.subscene = 3;
                    }
                }
            }
            if(convo.subscene == 6) {
                talk("No worries.\n Have a great day!", width*0.3, height*0.1, 200, 60, "r")
                if(timer.count(1000)) {
                    fade.fadeOut(10);
                }
                if(fade.fadedOut()) {
                    fade = new Fade();
                    timer = new Timer();
                    convo = new Scene();
                    nextScene();
                }
            }
            
            activateIcon("speech", fade.start);
        }
    }
}
let spoken = false;
function nextSubscene() {
    scene.nsub = false;
    scene.nextsub();
}
function nextScene() {
    
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
let phonetalk = ["This is the arrival check-in \nportal.\n\nPlease state your name \nto verify your identity.", "You said your name was: \n"]

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
            pose = false;
            nextSubscene();
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

class Delay {
    constructor() {
        this.now = millis();
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
