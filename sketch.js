let stars = []
let spark = ['y', 'n']
let scene, convo; //ll around scene/convo obj
let fade; //all around fade obj
let t; //general text obj
let timer; //general timer 
let talktimer; //timer for talk audio
let handposeloaded = false;
let sound;//genera sound obj
let sound1; //another one to avoid overlap
let w;
function setup() {
    setupSpeech();
    //!
    setupHand();
    //getAudioContext().resume();
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
    t = new Text("", width/2-80, height/2-40, 10)
    timer = new Timer();
    talktimer = new Timer();
    sound = new Sound();
    sound1 = new Sound();
    
    //! to set scenes
//    scene.scene = 0
//    scene.subscene = 0
//    convo.subscene = 2
    
//    w = createButton('activate mic');
//    w.mousePressed(doSomething);
//    w.position(width/2, height)
//    w.size(150, 80)
    
    let stored = localStorage.getItem('scene');
    let substored = localStorage.getItem('subscene');
    // If the old count exists, parse it!
    if (stored) {
        scene.scene = parseFloat(stored);
        scene.subscene = parseFloat(substored);
        if(parseFloat(stored) == 0) {
            if(parseFloat(substored) >= 2)
                welcome = true;
            else 
                scene.subscene = 0;
        }
        else if (parseFloat(stored) > 0)  {
            welcome = true;
        }
    }
    
}

let poseinit = false;
let welcome = false;
function draw() { 
//    localStorage.clear();
    background(220);

    //print(speak)
    if(canspeak == true && speak == true) {
        print(response);
    }
    
    //for doors
    if(done == true) {
        if(rooms[row][col].color == "w") c = "White"
        if(rooms[row][col].color == "y") c = "Yellow"
        if(rooms[row][col].color == "g") c = "Green"
    }
    
    //initial loadModel
    //!
    if (handposeModel && videoDataLoaded && poseinit == false){
        handposeModel.estimateHands(capture.elt).then(function(_hands){
            predictions = _hands;
        })
        if(timer.count(800)) {
            poseinit = true;
            timer = new Timer();
        }
   }
  
    if(poseinit == false) {
        background(0)
        pop();
        gif.show();
        gif.position(windowWidth/2-gif.width/2, height/2-gif.height/2);        
        push();
        fill(255)
        textSize(30);
        textFont('Open Sans')
        textAlign(CENTER)
        text('Loading. . .', width/2, height * 0.9);
        pop();
        
        push();
        fill(255)
        textSize(24);
        textAlign(CENTER)
        textFont('Open Sans')
        text('Scatterbrain Productions', width/2, height*0.12);
    }
    else {
        gif.hide();
    }
    //!
    if (handposeModel && videoDataLoaded && poseinit == true){
        if(scene.scene == 0) 
            sceneIntro();
        if(scene.scene == 1)
            taxiScene();
        if(scene.scene == 2)
            trainingIntro();
        if(scene.scene == 3)
            doorGame();
        if(scene.scene == 4)
            equipmentTraining();
        if(welcome == true)
            welcomeBack()
    }
}

var re = false, cont = false;
function welcomeBack() {
    //BG
    push()
    fill(0)
    rect(0, 0, width, height)
    pop()
    fill(255)
    textAlign(CENTER);
    let storedname = localStorage.getItem('name');
      // If the old count exists, parse it!
    if (storedname) {
        push()
        textSize(40);
        text("Welcome Back, Agent "+storedname, width/2, height/2)
        pop()
    }
    else {
        push()
        textSize(40);
        text("Welcome Back", width/2, height/2)
        pop()
    }
    
    //options
      push()
      textSize(24);
      text("Restart", width*0.2, height*0.8)
      pop()

      push()
      textSize(24);
      text("Continue", width*0.8, height*0.8)
      pop()
    
    re = collidePointRect(mouseX, mouseY, width*0.1, height*0.75, 170, 50);
    cont = collidePointRect(mouseX, mouseY, width*0.7, height*0.75, 170, 50);
    
    if(re) {
        text("________", width*0.2, height*0.82)
    }
    if(cont) {
        text("________", width*0.8, height*0.82)
    }

    
}
function mousePressed() {
    if(handposeModel && videoDataLoaded && poseinit == true && welcome == false)
        move = true;
    if(re && welcome == true) {
        scene.scene = 0;
        scene.subscene = 0;
        user = "";
        localStorage.clear();
        welcome = false;
    }
    if(cont && welcome == true) {
        welcome = false;
    }
}




