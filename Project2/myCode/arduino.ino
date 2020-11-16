const int ledPin5 = 5; // the pin that the LED is attached to
const int ledPin6 = 6; // the pin that the LED is attached to
const int ledPin7 = 7; // the pin that the LED is attached to

int inByte;     // a variable to read incoming serial data into

void setup() {
  Serial.begin(9600);             // initialize serial communication
  pinMode(ledPin5, OUTPUT);        // initialize the LED pin as an output
  pinMode(ledPin6, OUTPUT);        // initialize the LED pin as an output
  pinMode(ledPin7, OUTPUT);        // initialize the LED pin as an output


}

void loop() {
  if (Serial.available() > 0) { // see if there's incoming serial data
    inByte = Serial.read(); // read it
    if (inByte == 'H') {    // if it's a capital H (ASCII 72),
      digitalWrite(ledPin5, HIGH); // turn on the LED
      digitalWrite(ledPin6, HIGH); // turn on the LED
      digitalWrite(ledPin7, HIGH); // turn on the LED

    }
    if (inByte == 'L') {    // if it's an L (ASCII 76)
      digitalWrite(ledPin5, LOW); // turn off the LED
      digitalWrite(ledPin6, LOW); // turn off the LED
      digitalWrite(ledPin7, LOW); // turn off the LED

    }
  }
}
