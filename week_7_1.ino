// potentiometer value 537-0

const int buttonPin = 2;      
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
    int inByte = Serial.read();
  
  // read the X axis:
  total1 = total1 - readings1[readIndex1];
  readings1[readIndex1] = analogRead(inputPin1);
  total1 = total1 + readings1[readIndex1];
  readIndex1 = readIndex1 + 1;

  if (readIndex1 >= numReadings) {
    readIndex1 = 0;
  }

  average1 = total1 / numReadings;
  Serial.print(average1);
  delay(1); 
  Serial.print(",");

//  int sensorValue = analogRead(A0);
//  Serial.print(sensorValue);

  // read the Y axis:
  total2 = total2 - readings2[readIndex2];
  readings2[readIndex2] = analogRead(inputPin2);
  total2 = total2 + readings2[readIndex2];
  readIndex2 = readIndex2 + 1;

  if (readIndex2 >= numReadings) {
    readIndex2 = 0;
  }

  average2 = total2 / numReadings;
  Serial.print(average2);
  delay(1); 
  Serial.print(",");
 
//  int sensorValue = analogRead(A1);
//  Serial.print(sensorValue);
//  Serial.print(",");
// 
  // read the button:
int  sensorValue = digitalRead(buttonPin);
  Serial.println(sensorValue);

    }
}
