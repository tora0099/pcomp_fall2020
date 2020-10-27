// potentiometer value 237-0

const int buttonPin = 2;      // digital input
const int numReadings = 20;

int readings1[numReadings];      // the readings from the analog input
int readIndex1 = 0;              // the index of the current reading
int total1 = 0;                  // the running total
int average1 = 0;                // the average

int inputPin1 = A0;
int inputPin2 = A1;

int readings2[numReadings];      // the readings from the analog input
int readIndex2 = 0;              // the index of the current reading
int total2 = 0;                  // the running total
int average2 = 0;                // the average

 
void setup() {
  // configure the serial connection:
  Serial.begin(9600);
  // configure the digital input:
  pinMode(buttonPin, INPUT);

   for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings1[thisReading] = 0;
  }
    for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings2[thisReading] = 0;
  }

    while (Serial.available() <= 0) {
    Serial.println("hello"); // send a starting message
    delay(300);              // wait 1/3 second
  }
}
 
void loop() {


  if (Serial.available() > 0) {
    // read the incoming byte:
    int inByte = Serial.read();
    // read the sensor:
  
  // read the X axis:
 // subtract the last reading:
  total1 = total1 - readings1[readIndex1];
  // read from the sensor:
  readings1[readIndex1] = analogRead(inputPin1);
  // add the reading to the total:
  total1 = total1 + readings1[readIndex1];
  // advance to the next position in the array:
  readIndex1 = readIndex1 + 1;

  // if we're at the end of the array...
  if (readIndex1 >= numReadings) {
    // ...wrap around to the beginning:
    readIndex1 = 0;
  }

  // calculate the average:
  average1 = total1 / numReadings;
  // send it to the computer as ASCII digits
  Serial.print(average1);
    delay(1);  // delay in between reads for stability
  Serial.print(",");


//  
//  int sensorValue = analogRead(A0);
//  // print the results:
//  Serial.print(sensorValue);


  // read the X axis:
 // subtract the last reading:
  total2 = total2 - readings2[readIndex2];
  // read from the sensor:
  readings2[readIndex2] = analogRead(inputPin2);
  // add the reading to the total:
  total2 = total2 + readings2[readIndex2];
  // advance to the next position in the array:
  readIndex2 = readIndex2 + 1;

  // if we're at the end of the array...
  if (readIndex2 >= numReadings) {
    // ...wrap around to the beginning:
    readIndex2 = 0;
  }

  // calculate the average:
  average2 = total2 / numReadings;
  // send it to the computer as ASCII digits
  Serial.print(average2);
    delay(1);  // delay in between reads for stability

  Serial.print(",");
 
//  // read the y axis:
//  int sensorValue = analogRead(A1);
//  // print the results:
//  Serial.print(sensorValue);
//  Serial.print(",");
// 
  // read the button:
int  sensorValue = digitalRead(buttonPin);
  // print the results:
  Serial.println(sensorValue);

    }
}
