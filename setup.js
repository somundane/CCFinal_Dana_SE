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
let continuous = true;
let interimResults = false;
function setupSpeech() {
    var sp = new p5.Speech(); 
    speechRec = new p5.SpeechRec(gotSpeech);
    speechRec.start(continuous, interimResults);
  
    function gotSpeech(speech) {
        speak = true;
        response = speech.text;
    }
    print(response);
}
