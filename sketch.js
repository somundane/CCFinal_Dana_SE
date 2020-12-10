let stars = []
let spark = ['y', 'n']
let scene, convo; //ll around scene/convo obj
let fade; //all around fade obj
let t; //general text obj
let timer; //general timer 
let handposeloaded = false;
let sound;//genera sound obj
let w
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
    sound = new Sound();
    
    //! to set scenes
    //scene.scene = 2
//    scene.subscene = 0
//    convo.subscene = 2
    
    w = createButton('Click here to activate mic');
    w.mousePressed(doSomething);
}
function doSomething(){
    print('thisran')
}
let move = false;
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
    
    //for doors
    if(rooms[row][col].color == "w") c = "White"
    if(rooms[row][col].color == "y") c = "Yellow"
    if(rooms[row][col].color == "g") c = "Green"
    
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
    }
}
function equipmentTraining() {
    fade.fadeIn(20)
    push();
    tint(255, fade.start)
    image(range, 0, 0)
    image(darts, 0, 0)
    let f = map(fade.start, 0, 255, 0, 200)
    fill(0, f)
    rect(0, 0, width, height)
    pop();
    push()
    rectMode(CENTER)
    fill(240)
    noStroke();
    rect(width/2, height/2, 500, 300, 10)
        fill(40)
        textSize(24)
        textAlign(CENTER);
        textFont('Poppins');
        text("To Be Continued. . .\n\nEquipment Training Facility\nUnder Construction :)", width/2, height*0.45)
    pop()
}
let bomb = false;
function doorGame() {
    setupDoors();
    let ec;
    if(done == true) {
        if(rooms[end.row][end.col].color == "w") ec = "White"
        if(rooms[end.row][end.col].color == "y") ec = "Yellow"
        if(rooms[end.row][end.col].color == "g") ec = "Green"
    }
      if(done == true) {
        print("Start: " + row + ", " + col)
        print("End: " + end.row + ", " + end.col)

        if(row == end.row && col == end.col) {
          print("success")
        }
      }
    fade.fadeIn(20)
    push();
    tint(255, fade.start)
    image(blueprint, 0, 0)
    if(convo.subscene < 5 || bomb == true) {
        lizard.resize(0, 600)
        push()
        translate(width,0); 
        scale(-1,1);
        image(lizard, -250, 200)
        pop()
    }
    pop();
    dialogueTrue(0, 0);
    dialogueBox(fade.start);
    activateIcon("speech", fade.start);
    push()
    tint(255, fade.start)
    image(speaker, 90, height*0.86)
    pop();
    if(fade.state == "in") {
        if(convo.subscene == 0) {
        talk("We will test your logical\nabilities and communication\nin this assessment.", width*0.46, height*0.4, 200, 90, "r")
        if(timer.count(4000))
            talk("Agent K-9 is in one \nof these rooms. The both\nof you must work together \nin diffusing a bomb.", width*0.46, height*0.4, 200, 90, "r")
        if(timer.count(8000)) {
            talk("Say yes if you're with me\nso far. Say no if you want me \nto repeat that.", width*0.46, height*0.4, 200, 90, "r")
            if(speak == true && (response.includes("yes") || response.includes("yep"))) {
                timer = new Timer();
                response = "";
                convo.nsub = false;
                convo.nextsub();
            }
            if(speak == true && (response.includes("no") || response.includes("nope"))) {
                timer = new Timer();
                response = "";
            }
            }
        }
        print(convo.subscene)
        if(convo.subscene == 1) {
            talk("If you notice, the map\nshows you the room's colors\nand number of doors.", width*0.46, height*0.4, 200, 90, "r")
            if(timer.count(4000))
            talk("That is as much as you will \nknow. Although you can \ncommunicate with K-9 to\nask what he sees.", width*0.46, height*0.4, 200, 90, "r")
            if(timer.count(8000)) {
                talk("You still with me?", width*0.46, height*0.4, 200, 90, "r") 
                if(speak == true && (response.includes("yes") || response.includes("yep"))) {
                timer = new Timer();
                convo.nsub = false;
                convo.nextsub();
                }
                if(speak == true && (response.includes("no") || response.includes("nope"))) {
                timer = new Timer();
                response = "";
                }
            }
        }
        if(convo.subscene == 2) {
            talk("The only information you\nare given is that the bomb\nis in a room with " + rooms[end.row][end.col].door + " doors and \n" + ec + " walls.", width*0.46, height*0.4, 200, 90, "r")
            if(timer.count(2000)) {
                inform = true;
            }
            if(timer.count(4000)) {
                talk("Since you have the map,\nit is up to you to let K-9 \nknow where to go.\nGot it?", width*0.46, height*0.4, 200, 90, "r")
                if(speak == true && (response.includes("yes") || response.includes("yep")|| response.includes("okay")|| response.includes("got"))) {
                timer = new Timer();
                response = "";
                convo.nsub = false;
                convo.nextsub();
                }
            }
        }
        if(convo.subscene == 3) {
            talk("When you're ready to\nbegin, just ask K-9 what\nhe sees.", width*0.46, height*0.4, 200, 90, "r")
                if(speak == true && (response.includes("what") ||response.includes("see") ||response.includes("you")||response.includes("do"))) {
                timer = new Timer();
                response = "";
                k9speak("I am in a "+c+" room with " +rooms[row][col].door+ " doors.")
                convo.nsub = false;
                convo.nextsub();
            }
        }
        if(convo.subscene == 4) {
            talk("Good. Now you get it.You \nmust now tell K-9 where\nto go next. (hint: udlr) \nYou're on your own now.", width*0.46, height*0.4, 200, 90, "r")
            
            k9speak("I am in a "+c+" room with " +rooms[row][col].door+ " doors.")
            
            if(speak == true && (response.includes("up") || response.includes("co-op")|| response.includes("above"))) {
                timer = new Timer();
                response = "";
                moveUp()
                convo.subscene=5;
            }
            else if(speak == true && (response.includes("down")|| response.includes("below")|| response.includes("town"))) {
                timer = new Timer();
                response = "";
                moveDown()
                convo.subscene=5;
            }
            else if(speak == true && (response.includes("left"))) {
                timer = new Timer();
                response = "";
                moveLeft()
                convo.subscene=5;
            }
            else if(speak == true && (response.includes("right")|| response.includes("ride"))) {
                timer = new Timer();
                response = "";
                moveRight()
                convo.subscene=5;
            }
        }
        if(convo.subscene == 5) {
            if(row == end.row && col == end.col) {
              success = true;
                timer = new Timer();
                convo.subscene=6;
            }
            else {
                k9speak("I am now in a "+c+" room with " +rooms[row][col].door+ " doors.")
                if(cant == true) {
                    k9speak("It's not possible to do that!")
                }
                if(speak == true && (response.includes("up") || response.includes("off")||response.includes("co-op"))) {
                    if(response!="") k9sound.play = false
                    timer = new Timer();
                    response = "";
                    moveUp()
                }
                else if(speak == true && (response.includes("down")||response.includes("dan"))) {
                    if(response!="") k9sound.play = false
                    timer = new Timer();
                    response = "";
                    moveDown()
                }
                else if(speak == true && (response.includes("left"))) {
                    if(response!="") k9sound.play = false
                    timer = new Timer();
                    response = "";
                    moveLeft()
                }
                else if(speak == true && (response.includes("right") ||response.includes("wright"))) {
                    if(response!="")  k9sound.play = false
                    timer = new Timer();
                    response = "";
                    moveRight()
                } 
            }
        }
        if(convo.subscene == 6) {
            k9speak("\We found the bomb!", 4)
            bomb = true;
            if(timer.count(2000)) {
                talk("Good job!!! That wasn't so\nhard, wasn't it?\nThink you're ready\nfor equipment training?", width*0.46, height*0.4, 200, 90, "r");
                dialogueTrue(15, 15);
                dialogueBox(255);
                if(speak == true &&(response.includes("yes")||response.includes("no")||response.includes("maybe")||response.includes("okay")||response.includes("ok")||response.includes("alright") || response.includes("yep"))) {
                    fade.fadeOut(20);
                }
                if(fade.fadedOut()) {
                    fade = new Fade();
                    timer = new Timer();
                    convo = new Scene();
                    scene.subscene = 0;
                    spoken = false;
                    nextScene();
                }
            }

        }
    }

    if(inform == true && bomb == false) {
        push()
        fill(255)
        textSize(16)
        textAlign(RIGHT);
        textFont('Poppins');
        text("The bomb is in a room with:\n"+rooms[end.row][end.col].door+" doors &\n"+ ec +" walls", width * 0.95, height * 0.88)
        pop()
    }
}
let inform = false;
function trainingIntro(){
    if(scene.subscene == 0) { 
        if(fade.state == "out")
        fade.fadeIn(20)
        push();
        tint(255, fade.start)
        image(facility, 0, 0)
        lizard.resize(0, 400)
            push()
            translate(width,0); 
            scale(-1,1);
            image(lizard, -70, 250)
            pop()
        pop();
    if(fade.state == "in") {
    if(convo.subscene==0) {
        talk("Welcome to the MIB\ntraining facility!", width*0.4, height*0.4, 200, 90, "r")
        if(timer.count(2000))
            talk("We will begin your training\nwith an asessment of your\ncommunication and your\nproblem solving.", width*0.4, height*0.4, 200, 90, "r")
        if(timer.count(5000))
            talk("Let me know when you are\nready and I will brief you on\nyour 'case.'\n", width*0.4, height*0.4, 200, 90, "r")
        if(timer.count(6000)) {
            if(showid==false && scene.subscene <1) {
                push()
                fill(0)
                ellipse(63, height * 0.87, 80)
                //rect(20, height * 0.80, 85, 90)
                translate(0, 0)
                activateIcon("speech", fade.start); 
                pop()
            }
            if(speak == true && (response.includes("ready") || response.includes("go") || response.includes("I'm") || response.includes("do"))) {
                timer = new Timer();
                response = "";
                convo.nextsub();
            }
        }
        }
        if(convo.subscene == 1) {
            talk("Great! Let's begin.", width*0.4, height*0.4, 200, 90, "r")
            if(timer.count(2000)) 
            talk("First, you'll need to take\nthis earpiece.\nStandard secure two-way \ncommunication.", width*0.4, height*0.4, 200, 90, "r")
            
            if(timer.count(3000)) {
                showid = true;
                pose = true;
                push()
                fill(170)
                ellipse(width*0.53, height*0.69, 70)
                image(earpiece, width/2, height*0.65)
                pop()
                timer = new Timer()
                predictions = [];
                convo.subscene = 2;
            }
        }
        if(convo.subscene == 2){
//            print("Grab: " +grab)
//            print("Hit: " +hit)
                talk("First, you'll need to take\nthis earpiece.\nStandard secure two-way \ncommunication.", width*0.4, height*0.4, 200, 90, "r")
                push()
                fill(170)
                noStroke()
                ellipse(width*0.53, height*0.69, 70)
                image(earpiece, width/2, height*0.65)
                pop()
            
            if(showid == true) {
                push()
                fill(0)
                ellipse(63, height * 0.87, 80)
                //rect(width*0.49, height*0.64, 100, 100)
                translate(0, -46)
                activateIcon("hand", fade.start); 
                pop()
                
                if(pose == true) {  handposeModel.estimateHands(capture.elt).then(function(_hands){
                predictions = _hands;
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
                if(handposeloaded == false) {
                    push()
                    translate(10, height*0.85)
                    textSize(12)
                    fill(100, 0, 0)
                    rect(width*0.8, height*0.05, 120,30)
                    fill(255)
                    text("Please Wait", 660, height*0.08)
                    pop()
                }   
                drawKeypoints();
                checkGrab(width*0.50, height*0.63, 100, 100);
                //timer is for debounce
                if(grab && hit) {
                    sound.playOnce(pickup)
                    dialogueTrue(0, 0);
                    dialogueBox(255);
                    activateIcon("speech", 255);
                    image(speaker, 90, height*0.86)
                    showid = false
                    pose = false
                    timer = new Timer()
                    fade = new Fade();
                    convo = new Scene();
                    sound = new Sound();
                    scene.subscene =1;
                    response = ""
                }
                }
            
            }
           }
    }
            }
    
    if(scene.subscene == 1) {
        image(facility, 0, 0)
        lizard.resize(0, 400)
            push()
            translate(width,0); 
            scale(-1,1);
            image(lizard, -70, 250)
            pop()
        if(convo.subscene == 0) {
            fade.fadeIn(20)
            talk("The device is pretty \nstandard. You can speak \ninto it to communicate\nwith agent K-9\n", width*0.4, height*0.4, 200, 90, "r")
            //dialoguebox set
            dialogueTrue(0, 0);
            dialogueBox(fade.start);
            activateIcon("speech", fade.start);
            push()
            tint(255, fade.start)
            image(speaker, 90, height*0.86)
            pop();
            if(timer.count(2000)) {
                infoBox(info[3], "Radio Device", width * 0.03, height * 0.43, 300, 200, 8, "down", 0.32, fade.start, true);
                //dialoguebox set
                dialogueTrue(0, 0);
                dialogueBox(fade.start);
                activateIcon("speech", fade.start);
                push()
                tint(255, fade.start)
                image(speaker, 90, height*0.86)
                pop();
                if(speak == true && response!="") {
                    convo.subscene = 1;
                    response = "";
                    timer = new Timer()
                }
            }
        }
        if(convo.subscene == 1) {
            talk("The device is pretty \nstandard. You can speak \ninto it to communicate\nwith agent K-9\n", width*0.4, height*0.4, 200, 90, "r")
            dialogueTrue(0, 0);
            dialogueBox(fade.start);
            activateIcon("speech", fade.start);
            push()
            tint(255, fade.start)
            image(speaker, 90, height*0.86)
            pop();
            k9speak("Hi, " + user+"! Field Agent K-9 here.")
            if(timer.count(2000))
            k9speak("I will be your partner for your assessment today.")
            if(timer.count(4000))
            k9speak("Welcome aboard and good luck!")
            if(timer.count(6000)) {
                k9speak("")
                talk("Feel free to just let me \nknow when you're ready \nto be briefed! ", width*0.4, height*0.4, 200, 90, "r")
                if(response != "" && speak == true) {
                    if(response.includes("ready") || response.includes("I'm") || response.includes("go") || response.includes("brief")) {
                        timer = new Timer()
                        response = ""
                        k9sound.play = false;
                        convo.subscene = 2;
                    }
                }
            }

        }
        if(convo.subscene == 2) {
            talk("Alright! Let's get to it!", width*0.4, height*0.4, 200, 90, "r") 
            if(timer.count(2000)) {
                fade.fadeOut(20);
                if(fade.fadedOut()) {
                    fade = new Fade();
                    timer = new Timer();
                    convo = new Scene();
                    scene.subscene = 0;
                    spoken = false;
                    nextScene();
                }
            }
            dialogueTrue(0, 0);
            dialogueBox(fade.start);
            activateIcon("speech", fade.start);
            push()
            tint(255, fade.start)
            image(speaker, 90, height*0.86)
            pop();
        }
    }
}
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
let showid = false;
function taxiScene() {
    if (!taxibg.isPlaying())
            taxibg.play();
    if(fade.state == "out")
        fade.fadeIn(20)
    push();
    tint(255, fade.start)
    image(taxi, 0, 0)
    speechleft.resize(500, 0)
    if(spoken == false) {
        image(speechleft, 210, 100)
    }
    pop();
    dialogueTrue(0,0);
    dialogueBox(fade.start);

    fill(225)
    //rect(width*0.3, height*0.32, 260, 165)
    if(fade.state == "in") {
        if(speak==true) {
            if((response.includes("hello") || response.includes("hi") || response.includes("hey"))) {
                    convo.nextsub();
                    spoken = true;
            }
            //dtext 7-
            if(convo.subscene == 1) {
                talk("Glad to see that you had a\nsafe flight.\n\nIt took you long enough,\nAgent " + user, width*0.3, height*0.1, 200, 100, "l")
                dialogueTrue(7, 7);
                dialogueBox(255);
                if(response.includes("sorry")) {
                    response = ""
                    convo.subscene = 2;
                }
                else if(response.includes("who are you") || response.includes("who")) {
                    response = ""
                    convo.subscene = 3;
                }
            }
            if(convo.subscene == 2) {
                talk("It really is no big deal.\n\nWelcome to the Metropolis!", width*0.3, height*0.1, 200, 80, "l")
                dialogueTrue(8, 8);
                dialogueBox(255);
                if(response != "") {
                    if(response.includes("who are you")) {
                        response = ""
                        convo.subscene = 3;
                    }
                }
            }
            if(convo.subscene == 3) {
                talk("Right. I haven't introduced\nmyself.", width*0.3, height*0.1, 200, 80, "l")
                if(timer.count(2000))
                    talk("I'm Owen.\nOwen Lassiter.", width*0.3, height*0.1, 200, 80, "l")
                if(timer.count(4000))
                    talk("I'm the agent assigned to\nhandle your training.", width*0.3, height*0.1, 200, 80, "l")
                if(timer.count(5000)) {
                    dialogueTrue(9, 9);
                    dialogueBox(255);
                }
                if(timer.count(6000) && response != "") {
                    if(response.includes("training")||response.includes("framing")||response.includes("freezing")||response.includes("ing")) {
                        response = ""
                        timer = new Timer();
                        convo.subscene = 4;
                    }
                }
            }
            if(convo.subscene == 4) {
                talk("Yes. Training. \n\nI understand you come from \nthe FBI.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(2000))
                    talk("But the FBI and the Mars \nMetropolis Investigation \nBureau (M.I.B) have very \ndifferent protocols.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(6000))
                    talk("As such, we must acquaint \nyou with them and also \ntrain you to use our \ntactical equipment.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(10000))
                    talk("Before I forget, here. Take \nyour ID badge. You will \nneed it to enter the facilities.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(13000)) {
                    response = ""
                    timer = new Timer();
                    pose = true;
                    showid = true;
                    predictions = [];
                    convo.subscene = 5;
                }
            }
            if(convo.subscene == 5) {
                if(pose == true) {  
                handposeModel.estimateHands(capture.elt).then(function(_hands){
                predictions = _hands;
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
                    if(handposeloaded == false) {
                        push()
                        translate(10, height*0.85)
                        textSize(12)
                        fill(100, 0, 0)
                        rect(width*0.8, height*0.05, 120,30)
                        fill(255)
                        text("Please Wait", 660, height*0.08)
                        pop()
                    }   
                    drawKeypoints();
                    checkGrab(width*0.3, height*0.32, 260, 165);
                    if(grab && hit) {
                        sound.playOnce(pickup)
                        showid = false
                        pose = false
                        timer = new Timer()
                        sound = new Sound();
                        convo.subscene = 6;
                    }
                    else {
                        showid = true
                    }
                }
            }
            if(convo.subscene == 6) {
                talk("Alright. We should be all set.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(2000))
                    talk("Let us head to the \ntraining facility at HQ so \nwe can begin your training.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(4000)) 
                    talk("Ready?", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(4500)) {
                    dialogueTrue(10, 10);
                    dialogueBox(255);
                    if(response.includes("do") ||response.includes("this") ||response.includes("do this") || response.includes("do it")) {
                        fade.fadeOut(10)
                        if(fade.fadedOut()) {
                            fade = new Fade();
                            timer = new Timer();
                            convo = new Scene();
                            scene.subscene = 0;
                            spoken = false;
                            response = ""
                            nextScene();
                        }
                    }
                } 
            }
                
        }
    }
    if(showid == true) {
        push()
        tint(100)
        image(id, 3, 3)
        pop()
        image(id, 0, 0)
        fill(255, 0, 0)
        push()
        fill(80)
        textAlign(LEFT)
        textFont('Inconsolata');
        textLeading(20);
        textSize(12)
        text("Agent: " + user + "\n\nStatus: Trainee\nLicense: To be updated\nWeapon certification: Pistol, Katana\nOrigin: Earth\nHint: Actually do a grabbing motion", width*0.33, height * 0.38)
        pop()
        image(glare, 0, 0)
        activateIcon("hand", fade.start); 
    }
    else
        activateIcon("speech", fade.start);   
}

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

function mousePressed() {
    if(handposeModel && videoDataLoaded && poseinit == true)
        move = true;
}




