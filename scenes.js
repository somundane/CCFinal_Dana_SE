let move = false;
let y = 0;
let x = 0;
let textfade = 255;
let pose = false;
let s = 30
////INTRO////////////////////////////////////////////////////////
let user;
function sceneIntro() {
    localStorage.setItem('scene', 0);
    if(scene.subscene >= 0 && scene.subscene < 2) {
        fill(0)
        text('p5.js', width/2, height/2);

        if(move == true && y > -1100) {
            if (!landing.isPlaying())
            landing.play();
            //!
            y -=10;
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
        textSize(42);
        textAlign(CENTER)
        textFont('Lexend Deca')
        text('Space Espionage', width/2, height/2);
        pop();
        
        if(scene.subscene == 1) {
        localStorage.setItem('subscene', 1);
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
        localStorage.setItem('subscene', 2);
        image(city, 0, -1100)
        image(wind, 0, 0)
        fade.fadeIn(20);
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
        }
    }
        if(scene.subscene == 3) {
        localStorage.setItem('subscene', 3);
            image(plane, 0, 0)
            image(scan, 0, 0)
            push()
            fill(255)
            textSize(28)
            textFont('Roboto Mono')
            text('Scan code upon arrival.', width*0.35, height*0.08)
            pop()
                fade.fadeIn(20);
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
                }

        }
    //phone
    if(scene.subscene == 4) {
        localStorage.setItem('subscene', 4);
        print(speak)
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
        if(fade.state == "out")
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
                    if(response.includes(","))
                        name = split(response, ",");
                    else
                        name = split(response, " ");
                    typeText("You said your name was: \n"+name[0]+" is that correct?", 2)
                    user = name[0];
                    localStorage.setItem('name', name[0]);
                }

                if(response.includes("yes")){
                    t.reset(4);
//                    t.clear();
//                    t.setText("Voice recognized. \nYour identity has been verified. \n\nName: "+name[0]"\nTrip Duration: Indefinite\n\nWelcome to Metropolis 612!")
//                    t.show();
                    typeText("Voice recognized. \nIdentity verified. \n\nName: "+user+"\nTrip Duration: Indefinite\n\nWelcome to Metropolis 612!", 4);
                    if(t.count >= t.length && t.id >= 5) {
                        t.re = false;            
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
                typeText("This is the arrival check-in \nportal.\n\nPlease state your name \nto verify your identity.", 0);
            }
        }
        if (t.re== false) {
            if(timer.count(2000)) {
                fade.fadeOut(20);
                print(fade.start)
            }
            if(fade.fadedOut()) {
                fade = new Fade();
                timer = new Timer();
                response = "";
                nextSubscene();
            }  
        }
    }
    if(scene.subscene == 5) {
        localStorage.setItem('subscene', 5);
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
        if(spoken == false) {
            infoBox(info[2], "Conversation", width * 0.1, height * 0.18, 300, 170, 8, "right", 0.2, fade.start, false);
            image(speechright, 420, 120)
        }
        dialogueTrue(0,0);
        dialogueBox(fade.start);
        activateIcon("speech", fade.start);
        speechright.resize(500, 0)
        //dtext 3-5
        if(fade.state == "in") {
            if(speak==true) {
                if((response.includes("hello") || response.includes("hi") || response.includes("hey"))) {
                    convo.nextsub();
                    spoken = true;
                }
            }
            if(convo.subscene == 1) {
                sound.playOnce(help)
                talk("Hey there. Is there anything\nI can help you with?", width*0.3, height*0.1, 200, 80, "r")
                dialogueTrue(3,3);
                dialogueBox(255);
                if(response.includes("where can I") || response.includes("a ride")|| response.includes("where can I get a ride")) {
                    convo.nsub = false;
                    response = ""
                    sound = new Sound();
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
                    else if(response.includes("cab")||response.includes("Taxi")||response.includes("tabs")||response.includes("capstan")) {
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
                talk("Turn left as you exit and\nyou'll find the cabs and\nwaiting area there.", width*0.3, height*0.1, 200, 90, "r")
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
                if(response != "") { if(response.includes("cabs")||response.includes("grabs") || response.includes("taxi")||response.includes("it is")||response.includes("then")) {
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
                talk("No worries.\nHave a great day!", width*0.3, height*0.1, 200, 60, "r")
                if(timer.count(1000)) {
                    fade.fadeOut(10);
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
            
            activateIcon("speech", fade.start);
        }
    }
}
let spoken = false;

let scanhit, hashit = false, time;
function drawPhone() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];

        const keypoint = prediction.landmarks[10];
        fill(255, 150, 0);
        noStroke();
        let x = map(keypoint[0], 0, capture.width, 0, 800);
        let y = map(keypoint[1], 0, capture.height, 0, 600);
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
//          print('HIT')
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
            sound.playOnce(ding);
            ellipse(width-x, y,40)
            speak = false;
            pose = false;
            response = "";
            timer = new Timer();
            nextSubscene();
            fade = new Fade();
            sound = new Sound();
        }
      }
      else{
          hashit = false;
      }
      
        predictions = [];
  }
}

////SCENE1 TAXI////////////////////////////////////////////////////////
let showid = false;
function taxiScene() {
    localStorage.setItem('scene', 1);
    localStorage.setItem('subscene', 0);
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
                if(!timer.count(2000))
                talk("Right. I haven't introduced\nmyself.", width*0.3, height*0.1, 200, 80, "l")
                if(timer.count(2000) && !timer.count(4000))
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
                if(!timer.count(2000))
                talk("Yes. Training. \n\nI understand you come from \nthe FBI.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(2000) && !timer.count(6000))
                    talk("But the FBI and the Mars \nMetropolis Investigation \nBureau (M.I.B) have very \ndifferent protocols.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(6000)&& !timer.count(10000))
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
                if(!timer.count(2000))
                talk("Alright. We should be all set.", width*0.3, height*0.1, 200, 90, "l")
                if(timer.count(2000) && !timer.count(4000))
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
        textLeading(20); //20
        textSize(12)//12
        text("Agent: " + user + "\n\nStatus: Trainee\nLicense: To be updated\nWeapon certification: Pistol, Katana\nOrigin: Earth\nHint: Actually do a grabbing motion", width*0.33, height * 0.38)
        pop()
        image(glare, 0, 0)
        activateIcon("hand", fade.start); 
    }
    else
        activateIcon("speech", fade.start);   
}
////SCENE2 TRAINING////////////////////////////////////////////////////////

let inform = false;
function trainingIntro(){
    localStorage.setItem('scene', 2);
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
        if(!timer.count(2000))
        talk("Welcome to the MIB\ntraining facility!", width*0.4, height*0.4, 200, 90, "r")
        if(timer.count(2000) && !timer.count(5000))
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
            if(!timer.count(2000))
            talk("Great! Let's begin.", width*0.4, height*0.4, 200, 90, "r")
            if(timer.count(2000)) 
            talk("First, you'll need to take\nthis earpiece.\nStandard secure two-way \ncommunication.", width*0.4, height*0.4, 200, 90, "r")
            if(timer.count(2500)) {
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
                if(grab && hit && timer.count(800)) {
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
    localStorage.setItem('subscene', 1);
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
            if(!timer.count(6000))
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

////SCENE3 DOOR GAME////////////////////////////////////////////////////////
let bomb = false;
function doorGame() {
    localStorage.setItem('scene', 3);
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
          //ID
        print("Start ID: " + rooms[row][col].id)
        print("End ID: " + rooms[end.row][end.col].id)

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
        if(!timer.count(4000))
        talk("We will test your logical\nabilities and communication\nin this assessment.", width*0.46, height*0.4, 200, 90, "r")
        if(timer.count(4000) && !timer.count(8000))
            talk("Agent K-9 is in one \nof these rooms. The both\nof you must work together \nin defusing a bomb.", width*0.46, height*0.4, 200, 90, "r")
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
        //print(convo.subscene)
        if(convo.subscene == 1) {
            if(!timer.count(4000))
            talk("If you notice, the map\nshows you the room's colors\nand number of doors.", width*0.46, height*0.4, 200, 90, "r")
            if(timer.count(4000)&&!timer.count(8000))
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
            if(!timer.count(2000))
            talk("The only information you\nare given is that the bomb\nis in a room with " + rooms[end.row][end.col].door + " doors and \n" + ec + " walls.", width*0.46, height*0.4, 200, 90, "r")
            if(timer.count(2000)&&!timer.count(4000)) {
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
            if(rooms[row][col].id == rooms[end.row][end.col].id) {
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
            speak = true;
            if(timer.count(2000)) {
                talk("Good job!!! That wasn't so\nhard, wasn't it?\nThink you're ready\nfor equipment training?", width*0.46, height*0.4, 200, 90, "r");
                dialogueTrue(15, 15);
                dialogueBox(255);
                if(speak == true &&(response.includes("yes")||response.includes("no")||response.includes("maybe")||response.includes("okay")||response.includes("ok")||response.includes("alright") || response.includes("yep"))) {
//                    fade.fadeOut(20);
//                    if(fade.fadedOut()) {
//                        
                        fade = new Fade();
                        timer = new Timer();
                        convo = new Scene();
                        scene.subscene = 0;
                        nextScene();
//                    }
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

////SCENE4 TBC////////////////////////////////////////////////////////
function equipmentTraining() {
    localStorage.setItem('scene', 4);
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