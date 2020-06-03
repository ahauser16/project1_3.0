## Group Project No. 1


### Table of Contents

* [Project Summary](#summary)
* [Installation [n/a]](#installation)
* [Usage [n/a]](#usage)
* [Credits [n/a]](#credits)
* [License [n/a]](#license)
* [Badges [n/a]](#badges)
* [Contributing](contributing)
* [Tests [n/a]](#tests)
----
#### Project Summary

I would describe this application as a 'lifestlye' app that is supposed to give the user a useful and dynamic wakeup call.  The objective of the project was to code an alarm clock application that when the desired date/time is reached plays a song that's representative of the current local weather.  The project can be explained in three parts: the alarm clock, the API call to openweathermap.org and the logic required to play a specific song depending on which 'description code' is received from the API.  Due to time constraints we uploaded several mp3 files for the music content instead of making a seperate API call to Spotify or embedding links to songs on Youtube.  For example, when the timer goes off the app plays The Beatles' "Here comes the Sun" if it's sunny with clear skies or ACDC's "Thunderstruck" if (yep you guessed it) it's raining with T-storms.  Ideally the response from openweathermap.org should be interpreted by more sophisticated logic to then search Spotify for a song, or a collection of songs returned as a dynamic playlist, that have keywords representative of different types of weather.

The alarm clock was coded with vanilla javascript, was very challenging and is shown below.  Once the alarm is set it 'ticks' every 1000 milliseconds and checks if the difference (in milliseconds) between when the alarm was set by the user and when the alarm was set to go off.  This was more useful than the setTimeout or other timer functions which are asynchronous and only execute once when the desired time is reached as opposed to the 'ticking' mechanism which checks every second to see if the countdown in milliseconds has reached zero.

```javascript
function setAlarmClock(targetTimeInMS, finishedCallback, tickCallback) { //front-door function
	var timeRemaining = targetTimeInMS; //targetTime minus now
	tick();
	function tick() {
		if (timeRemaining <= 0) {
			if ("function" === typeof finishedCallback) finishedCallback();
		}
		else {
			if ("function" === typeof tickCallback) tickCallback(timeRemaining);
			timeRemaining -= 1000;
			setTimeout(tick, 1000); //run the tick function again in one second
		}
	}
}
```

Once the alarm finishes an API call is made to the openweathermap API providing latitude and longitude as sole arguments obtained  through the geolocation function.  The response includes the data below as well as a three digit weather code (between 200 and 899) that indicates which category between (2xx and 8xx) Thunderstorm, Drizzle, Rain, Snow, Atmosphere, Clouds and Clear Sky and the severity (x01 and x05) within each category.  The logic is straightforward in that if the weather code is within a certain range then a song plays.  I included a table below that shows how the data connects. 

```
Temperature: 298.3 (kelvin)
Temp (high) 299.82 (kelvin)
Temp (low) 296.48 (kelvin)
Wind Speed: 5.7
Humidity: 73
Looks like clear sky today!
```

| Weather Code Range | Weather Description | Song |  	
|-	|-	|-	|
| 200-299 | Thunderstorm | Thunderstruck - ACDC  	|  	
| 300-399 | Drizzle | I Think It's Going to Rain Today - Randy Newman |  	
| 500-599 | Rain | Rain - The Beatles |
| 600-699 | Snow | Let it Snow - Gwen Stefani |
| 700-799 | Atmosphere | Dust in the Wind - Kansas |
| 800 | Clear Sky | Here Comes the Sun - The Beatles |
| 801-899 | Clouds | California Dreamin - the Mamas and the Papas |
| else | {...} | Pee Wee's Great Adventure - opening credits |



----
#### Installation

n/a


#### Usage 

n/a

----

#### Credits

1. Solo project

2. Tools/resources used: 
  - [Bootstrap][1]
  - [Openweathermap.org][2]
  - [Jquery.com][3] 
  - [Google Fonts][4]
  - [Moment.JS][5]

3.	Tutorials used: 
  - [MDN AJAX: Getting Started][6]
  - [Ajax Tutorial][7] 
  - [Jquery - Events][8]
  - [Jquery - DOM manipulation][9]
  - [Steps for an AJAX Operation][10]



#### License

n/a

----

#### Badges

n/a

#### Contributing

1. Abir Yusaf
2. Arthur Hauser
2. Ed Son
3. Fernando Alvarado

[Contributor Covenant](https://www.contributor-covenant.org/)

#### Tests

n/a
###### [link references]

[1]: https://getbootstrap.com/
[2]: https://openweathermap.org/
[3]: https://api.jquery.com/
[4]: https://fonts.google.com/
[5]: https://momentjs.com/
[6]: https://www.tutorialspoint.com/ajax/index.htm
[7]: https://www.tutorialspoint.com/jquery/jquery-events.htm
[8]: https://www.tutorialspoint.com/jquery/jquery-dom.htm
[9]: https://www.tutorialspoint.com/ajax/ajax_in_action.htm
[10]: https://www.contributor-covenant.org/

