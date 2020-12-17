//Intro
let mouse, mic, hand, speechleft, speechright;
//Intro
let city, wind, phone, plane, scan, phone2, exit;
//Chap1
let taxi, id, glare, facility, blueprint, device, range, darts, bottles, speaker, earpiece;
let gif;
let lizard;
//Sounds
let landing, ding, taxibg, pickup, radio, help, notif, whisper;
let hasplayed = false;

function preload() {
//    gif = createImg("https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/source.gif");
//    gif.hide(); 
    gif = createImg("https://media.giphy.com/media/y83E9zBVsoPIeodMQk/giphy.gif");
    gif.hide();
    
    //ICONS
    mouse = loadImage('visuals/icons/mouse.png');
    mic = loadImage('visuals/icons/mic.png');
    hand = loadImage('visuals/icons/hand.png');
    speechleft = loadImage('visuals/icons/speechleft.png');
    speechright = loadImage('visuals/icons/speechright.png');
    speaker = loadImage('visuals/icons/speaker.png');
    
    //INTRO
    city = loadImage('visuals/intro/city.png');
    wind = loadImage('visuals/intro/window.png');
    phone = loadImage('visuals/intro/phone.png');
    phone2 = loadImage('visuals/intro/phonescreen.png');
    plane = loadImage('visuals/intro/plane.png');
    scan = loadImage('visuals/intro/scan.png');
    exit = loadImage('visuals/intro/planeexit.png');

    //CHAP1
    taxi = loadImage('visuals/training/taxi.png');
    id = loadImage('visuals/training/id.png');
    glare = loadImage('visuals/training/idglare.png');
    facility = loadImage('visuals/training/facility.png');
    blueprint = loadImage('visuals/training/map.png');
    device = loadImage('visuals/training/smalldevice.png');
    range = loadImage('visuals/training/range.png');
    darts = loadImage('visuals/training/darts.png');
    bottles = loadImage('visuals/training/bottles.png');
    earpiece = loadImage('visuals/training/earpiece.png');
    
    lizard = loadImage('visuals/characters/lizard.png');
    
    landing = loadSound('sounds/landing.wav');
    landing.setVolume(0.04)

    taxibg = loadSound('sounds/taxibg.mp3');
    taxibg.setVolume(0.10)
    
    radio = loadSound('sounds/radio.wav');
    ding = loadSound('sounds/ding.wav');
    notif = loadSound('sounds/notif.wav');
    notif.setVolume(0.05)
    pickup = loadSound('sounds/pickup.wav');
    help = loadSound('sounds/help.wav');
    help.setVolume(0.30)
    whisper = loadSound('sounds/whisper.mp3');
    whisper.setVolume(2.5)
    
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
