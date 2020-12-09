//0-2 //3-6 //7-10 //11-
let dText = [
    "","> Where am I?", "Please process your arrival data by scanning the code. \n\nWe will be opening doors shortly.",
             
"> Where can I get a ride?", "> Cab/Taxi\n\n> Train", "> Cab it is", "> Thank you!",
            
"> . . .Sorry\n\n> Who are you?","> So who are you again?", "> Training. . .?", "> Let's do this!"];
let dialogue = [];
//show dialogue box
function dialogueBox(fade) {
    fill(0, fade)
    noStroke();
    rect(0, height * 0.82, width, height * 0.2)
    for(let i = 0; i < dialogue.length; i ++) {
        if(dialogue[i].show == true) {
            push();
            fill(255, fade);
            textLeading(16);
            textSize(20)
            textAlign(LEFT);
            textFont('Poppins');
            text(dialogue[i].text, 120, height*0.88)
            pop();
        }
    }
    push()
    scale(0.4);
    tint(255, 100)
    image(mic, 40, 940);
    image(hand, 40, 1050);
    pop();
}

//make specified dialogues true/ready to be shown
function dialogueTrue(start, end) {
    if(start==end) {
        for(let i = 0; i < dialogue.length; i ++) {
            if(i == start) {
                dialogue[i].show = true;
            }
            else {
                dialogue[i].show = false;
            }
        }
    }
    else {
        for(let i = 0; i < dialogue.length; i ++) {
            if(i < start || i > end) {
                dialogue[i].show = false;
            }
            else {
                dialogue[i].show = true;
            }
        }
    }
}

let info = [
    "Whenever the speech symbol is\nactive, you can advance through \nscenes by using speech commands.\nSome of these interactions will be \nguided, like this one!\n\nSay the phrase to try it out!\n(make sure there is no noise \nin the background)",
    "Whenever the hand symbol is\nactive, you can use your hands \nto interact with a scene.\n\n\nBring your hand up to the \ncamera to try it out!",
    "Whenever you see a speech \nbubble, there is an opportunity\nfor conversation.\n\nSay hello to start it!",
    "The speaker indicates sound\ncoming from the other end.\n\nIn this case, it will be input\nfrom Agent K-9.\n\nSay something for Agent K-9 to hear!"
    
];
function infoBox(info, t, x, y, w, h, r, pos, p, fade, bg) {
    noStroke();
    //bg
    if(bg == true) {
        let f = map(fade, 0, 255, 0, 160)
        push();
        fill(0, f)
        rect(0, 0, width, height)
        pop();
    }
    
    //box
    push();
    fill(255, fade)
    rect(x, y, w, h, r)
    //triangle
    if(pos == "down") {
        beginShape();
        vertex(x+w*p, y + h + 20);
        vertex(x+w*p - 20, y + h);
        vertex(x+w*p + 20, y + h);
        endShape(CLOSE);
    }
    if(pos == "right") {
        beginShape();
        vertex(x+w + 20, y+h*p);
        vertex(x+w, y+h*p - 20);
        vertex(x+w, y+h*p + 20);
        endShape(CLOSE);
    }
    pop();
    
    //i
    push();
    noFill();
    strokeWeight(2)
    stroke(0, fade)
    ellipse(x+31, y+30, 25)
    pop();

    //i
    fill(0, fade);
        push();
        textSize(20)
        textFont('Courgette');
        text("i", x+28, y+37)
        pop();

        //title
        push();
        textSize(20)
        textAlign(LEFT);
        textFont('Poppins');
        text(t, x+55, y+37)
        pop();

        //body
        push();
        textLeading(18);
        textSize(12)
        textAlign(LEFT);
        textFont('Montserrat');
        text(info, x+55, y+70)
        pop();
    
}

let canspeak = false, canpose = false;
function activateIcon(icon, fade) {
    if(icon == "speech") {
        push()
        scale(0.40);
        tint(250, fade)
        image(mic, 40, 940);
        pop();
        canspeak = true;
    }
    if(icon == "hand") {
        push()
        scale(0.40);
        tint(250, fade)
        image(hand, 40, 1050);
        pop();
        canpose = true
        
    }
}
function talk(str, x, y, w, h, lr) {
    fill(255)
    noStroke();
    rect(x, y, w, h, 10)
    if(lr == "r") {
        beginShape();
        vertex(x+w - 10, y+h);
        vertex(x+w, y+h - 10);
        vertex(x+w + 10, y+h+5);
        endShape(CLOSE);
    }
    if(lr == "l") {
        beginShape();
        vertex(x - 10, y+h+10);
        vertex(x, y+h - 10);
        vertex(x + 10, y+h);
        endShape(CLOSE);
    }
    push();
        fill(0)
        textLeading(18);
        textSize(12)
        textAlign(LEFT);
        textFont('Montserrat');
        text(str, x + 20, y+25)
    pop();
    
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
          star.y -=10;
          star.x += x;
      }
  }
}
