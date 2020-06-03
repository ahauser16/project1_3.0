

/*************************************************************/
/* CONTROLLER */
document.addEventListener("DOMContentLoaded", init);
var h1;
let lat;
let long;

//brooklyn coords
const defaultLat = 40.65;
const defaultLong = 73.97;

function init() {

	const addForm = document.forms['userDTEntry'];
	let countdown;

	addForm.addEventListener('submit', function (e) {
		e.preventDefault();
		const inputValue = addForm.querySelector('input[type="datetime-local"]').value;
		countdown = Date.parse(inputValue) - Date.now();
		console.log(Date.now())
		console.log(Date.parse(inputValue));
		h1 = document.querySelector("h1");
		const countdownInMS = countdown;
		setAlarmClock(countdownInMS, alarmFinished, showTimeRemaining);
	})
}

function showTimeRemaining(time) {
	h1.textContent = time;
}

function alarmFinished() {
	h1.textContent = "Alarm Finished!";
	// let lat = $(".latitude").text();
	// let long = $(".longitude").text();
	console.log(lat);
	
	//this is the fix
	// let coords = { lat:lat || defaultLat, long:long || defaultLong };

	let coords = { lat, long };
	getWeather(coords, displayWeather, true)
}


/*************************************************************/
/* ALARM CLOCK MODULE */
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
/*************************************************************/

/* Clock*/
function update() {
	var HourNow = moment().format('LTS')
	$("#Clock").text(HourNow)
};

$(document).ready(function () {
	setInterval(update, 0);
})
function latLon(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=eee2c7e90565ccc72ed33f1160353f32";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response)
		currentLoc = response.name;
		// dataStroage(response.name);// call the function for save the data
		// getCurrent(currentLoc);// call the the function for cureent weather
	});
}

// FERNANDO'S WEATHER API JS
//CALLED WHEN USER OPENS WEB-PAGE
function geoLatLong(callback) {
	navigator.geolocation.getCurrentPosition(function (position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;
		$(".latitude").text(lat);
		$(".longitude").text(long);
		//placehold
		if ("function" === typeof callback) callback({ lat, long });
	});
}

geoLatLong(function (coords) {
	getWeather(coords, displayWeather);
});


function getWeather(coords, callback, boolPlaySong) {

	var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.long + "&appid=166a433c57516f51dfab1f7edaed8413";

	console.log(queryURL)
	//add new api

	$.ajax({
		url: queryURL,
		method: "GET"
	})

		.then(function (response) {
			if (boolPlaySong === true) {
				let weatherID = response.weather[0].id;
				playSong(weatherID);
			}
			if ("function" === typeof callback) callback(response);
		})
		.catch(err => console.log(err));
		//create function that logs the message or prompt on the screen

}


function displayWeather(response) {
	console.log(response);

	$(".city").text("Greetings from goold ol' " + response.name);
	$(".country").text(response.sys.country);
	$(".temp").text("Temperature: " + response.main.temp);
	$(".tempHigh").text("Temp (high) " + response.main.temp_max);
	$(".tempLow").text("Temp (low) " + response.main.temp_min);
	$(".wind").text("Wind Speed: " + response.wind.speed);
	$(".humidity").text("Humidity: " + response.main.humidity);
	$(".description").text(("Looks like " + response.weather[0].description + " today!"));
	$(".icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
}

function playSong(weatherID) {

	console.log(weatherID);

	let myAudioElement;

	if (weatherID == 800) { 
		
		myAudioElement = new Audio("TheBeatlesHerecomesthSun.mp4") 
	}

	else if (weatherID >= 200 && weatherID <= 299) { 
		
		myAudioElement = new Audio("Thunderstruck.mp3") 
	}

	else if (weatherID >= 300 && weatherID <= 399) { 
		
		myAudioElement = new Audio("I Think It's Going to Rain Today.mp3") 
	}

	else if (weatherID >= 500 && weatherID <= 599) { 
		
		myAudioElement = new Audio("TheBeatlesRain.mp4") 
	}

	else if (weatherID >= 600 && weatherID <= 699) { 
		
		myAudioElement = new Audio("Let It Snow.mp3") 
	}

	else if (weatherID >= 700 && weatherID <= 799) { 
		
		myAudioElement = new Audio("Dust in the Wind.mp3") 
	}

	else if (weatherID >= 801 && weatherID <= 899) { 
		
		myAudioElement = new Audio("California Dreamin.mp3") 
	}

	else { 
		
		myAudioElement = new Audio("peewee.mp3") 
	}

	myAudioElement.addEventListener("canplaythrough", event => {

		myAudioElement.play();
	});
}