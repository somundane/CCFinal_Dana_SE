//Intro
let mouse, mic, hand;
let city, wind, phone, plane, scan;
let gif;
function preload() {
    gif = createImg("https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/source.gif");
    gif.hide();
    city = loadImage('visuals/intro/city.png');
    wind = loadImage('visuals/intro/window.png');
    phone = loadImage('visuals/intro/phone.png');
    plane = loadImage('visuals/intro/plane.png');
    scan = loadImage('visuals/intro/scan.png');
    
    mouse = loadImage('visuals/icons/mouse.png');
    mic = loadImage('visuals/icons/mic.png');
    hand = loadImage('visuals/icons/hand.png');
}



var handposeModel = null;
var videoDataLoaded = false;
var statusText = "Loading handpose model...";
var predictions = [];
var capture;

handpose.load().then(function(_model){
  console.log("model initialized.")
  statusText = "Model loaded."
  handposeModel = _model;
})

function setupHand() {
    capture = createCapture(VIDEO);
    capture.elt.onloadeddata = function(){
        console.log("video initialized");
        videoDataLoaded = true;
    }
    capture.hide();
}

let speechRec;
let speak = false;
let response;
let continuous = false;
let interimResults = false;
function setupSpeech() {
    var sp = new p5.Speech(); 
    speechRec = new p5.SpeechRec(gotSpeech);
    speechRec.start(continuous, interimResults);
    speechRec.onEnd = restart;
    function gotSpeech(speech) {
        speak = true;
        response = speech.text;
    }
//    print(response);
}

function restart(){
	speechRec.start();
}
