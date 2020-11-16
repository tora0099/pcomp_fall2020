// This code uses a p5.js MQTT Client and p5.serialport example created by TOM IGOE. The source code can be found at Tom's Github repository: https://github.com/tigoe/mqtt-examples

// This code borrows from Dan Shiffman/The Coding Train: "Coding Challenge #157: Zoom Annotations with Machine Learning + p5.js", found at https://www.youtube.com/watch?v=9z9mbiOZqSs&t=929s

// Copyright (c) 2019 ml5
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// MQTT client details:
let broker = {
  hostname: 'broker.shiftr.io',
  port: 443
};

// MQTT client:
let client;
// client credentials:
let creds = {
  clientID: 'p5Client',
  userName: 'try',
  password: 'try'
}

// topic to subscribe to when you connect
let topic = 'try/heart';

// HTML divs for local and remote messages
let localDiv;
let remoteDiv;
// position of the circle
let xPos, yPos;

let serial; // variable to hold an instance of the serialport library

var portName = '/dev/tty.usbmodem14201'; // fill in your serial port name here

let lastTimeSent = 0;
const sendInterval = 1000;

let outByte;

let heart;
let heartFade = 0;

let lightOn = 'H'
let lightOff = 'L'

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/zy5XCaofE/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  // replace with your image here
  heart = loadImage('heart.png');
}

function setup() {
  createCanvas(800, 450);

  // Create an MQTT client:
  client = new Paho.MQTT.Client(broker.hostname, broker.port, creds.clientID);
  // set callback handlers for the client:
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // connect to the MQTT broker:
  client.connect({
    onSuccess: onConnect, // callback function for when you connect
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true // use SSL
  });
  // create a div for local messages:
  localDiv = createDiv('local messages will go here');
  localDiv.position(20, 50);

  // create a div for the response:
  remoteDiv = createDiv('waiting for messages');
  remoteDiv.position(20, 80);

  // create serialport
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port

  // Create the video
  video = createCapture(VIDEO);
  video.size(800, 450);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}


function draw() {

  background(0);
  // Draw the video via the myHeart function
  myHeart();
  circle(xPos, yPos, 30);
}


function myHeart() {

  tint(255);
  image(flippedVideo, 0, 0);
}


function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


function serialEvent() {

  // read a byte from the serial port, convert it to a number:
  let inData = serial.readLine();
  // send it as an MQTT message to the topic:
  if (inData && millis() - lastTimeSent > sendInterval) {
    sendMqttMessage(inData);
    lastTimeSent = millis();
  }

}


function portOpen() {
  console.log('the serial port opened.')
  // send a byte to prompt the microcontroller to send:
  serial.write('x');
}


// called when the client connects
function onConnect() {
  localDiv.html('client is connected');
  client.subscribe(topic);
}

// called when the client loses its connection
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    console.log(response.errorMessage);
    localDiv.html('onConnectionLost:' + response.errorMessage);
  }
}


// called when a message arrives
function onMessageArrived(message) {
  remoteDiv.html('I got a message:' + message.payloadString);

  // turn light on or off depending on what message was sent

  if (message.payloadString == 'H') {
    serial.write(lightOn);

  } else

  {
    serial.write(lightOff);

  }

}

// called when you want to send a message:
function sendMqttMessage(msg) {
  // if the client is connected to the MQTT broker:
  if (client.isConnected()) {
    // start an MQTT message:
    message = new Paho.MQTT.Message(msg);
    // choose the destination topic:
    message.destinationName = topic;
    // send it:  
    client.send(message);
    // print what you sent:
    localDiv.html('I sent: ' + message.payloadString);
  }
}


// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
