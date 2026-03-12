#include <Adafruit_LiquidCrystal.h>

Adafruit_LiquidCrystal lcd(0);

// PIN
const int sensorPin = A0;
const int ledNormal = 5;
const int ledAlarm = 4;
const int buzzerPin = 8;

float temperatureC;

void setup()
{
  lcd.begin(16,2);
  lcd.setBacklight(1);

  pinMode(sensorPin, INPUT);
  pinMode(ledNormal, OUTPUT);
  pinMode(ledAlarm, OUTPUT);
  pinMode(buzzerPin, OUTPUT);

  lcd.setCursor(0,0);
  lcd.print("TEMP MONITOR");
  lcd.setCursor(0,1);
  lcd.print("STARTING...");
  delay(2000);
}

// fungsi membaca suhu lebih stabil
float readTemperature()
{
  int total = 0;

  for(int i=0;i<10;i++)
  {
    total += analogRead(sensorPin);
    delay(5);
  }

  float reading = total / 10.0;

  float voltage = reading * (5.0 / 1023.0);

  // rumus TMP36
  float tempC = (voltage - 0.5) * 100;

  return tempC;
}

// fungsi bunyi alarm
void alarmSound(int repeatDelay)
{
  tone(buzzerPin, 2500);
  delay(200);
  noTone(buzzerPin);
  delay(repeatDelay);
}

void loop()
{
  temperatureC = readTemperature();

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("TEMP:");
  lcd.print(temperatureC);
  lcd.print(" C");
  
   // kondisi DIE COLD
  if(temperatureC < 20)
  {
    lcd.setCursor(0,1);
    lcd.print("STT: COLD");

    digitalWrite(ledNormal, LOW);
    digitalWrite(ledAlarm, HIGH);

    alarmSound(800);   // beep lambat
  }


  // kondisi SLIGHTLY COLD
  if(temperatureC >= 20 && temperatureC < 27)
  {
    lcd.setCursor(0,1);
    lcd.print("STT:NORMAL COLD");

    digitalWrite(ledNormal, HIGH);
    digitalWrite(ledAlarm, LOW);

    noTone(buzzerPin);
    delay(1000);
  }

   // kondisi NORMAL
  else if(temperatureC >= 27 && temperatureC < 30)
  {
    lcd.setCursor(0,1);
    lcd.print("STT:NORMAL");

    digitalWrite(ledNormal, HIGH);
    digitalWrite(ledAlarm, LOW);

    noTone(buzzerPin);
    delay(1000);
  }

  
  // kondisi PANAS
  else if(temperatureC >= 30 && temperatureC < 35)
  {
    lcd.setCursor(0,1);
    lcd.print("STT:HOT");

    digitalWrite(ledNormal, LOW);
    digitalWrite(ledAlarm, HIGH);

    alarmSound(800);   // beep lambat
  }

  // kondisi BAHAYA
  else
  {
    lcd.setCursor(0,1);
    lcd.print("STT:DANGER");

    digitalWrite(ledNormal, LOW);
    digitalWrite(ledAlarm, HIGH);

    alarmSound(200);   // beep cepat
  }
}