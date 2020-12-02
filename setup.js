let video, handpose;
let predictions = [];
function setupHand() {
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    handpose = ml5.handpose(video, modelReady);
}
let done = false;
function modelReady() {
  console.log("Model ready!");
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
