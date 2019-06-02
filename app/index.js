import clock from "clock";
import document from "document";
import {preferences} from "user-settings";
import * as util from "../common/utils";
import * as weather from '../fitbit-weather/app';
import {display} from "display";
import {battery} from "power";
import {today} from 'user-activity';
import {HeartRateSensor} from "heart-rate";
import {vibration} from "haptics";
import * as messaging from "messaging";

const main = document.getElementById("main");
const date = document.getElementById("date");
const time = document.getElementById("time");
const batteryMeasure = document.getElementById("battery-measure");
const weatherElement = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");
const background = document.getElementById("background");
const steps = document.getElementById("steps");
const heartRate = document.getElementById("heart-rate");

var sensors = [];
setWeather(weather);
// updateBattery(battery);
clock.granularity = "minutes";

clock.ontick = (evt) => {
    let date = evt.date;
    let hours = date.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = util.zeroPad(hours);
    }
    let mins = util.zeroPad(date.getMinutes());
    time.text = `${hours}:${mins}`;

    setDate(date);
    // setWeather(weather);
    updateBattery(battery);
    updateActivity(today);
}


if (HeartRateSensor) {
    const hrm = new HeartRateSensor({frequency: 1});
    heartRate.text = "NA";

    hrm.addEventListener("reading", () => {
        heartRate.text = hrm.heartRate + "";
    });

    sensors.push(hrm);
    hrm.start();
}


display.addEventListener("change", () => {
    if (display.on) {
        // Have sensors running when screen is on.
        sensors.map(sensor => sensor.start());
        setWeather(weather);
        updateBattery(battery);
    } else {
        // Have sensors off when screen is off.
        sensors.map(sensor => sensor.stop());
    }
});


function setDate(today) {
    //
    var weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";

    date.text = weekday[today.getDay()] + " " + today.getDate();
}


function setWeather(weather) {
    // return the cached value if it is less than 60 minutes old
    weather.fetch(60 * 60 * 1000)
        .then(weather => console.log(JSON.stringify(weather)))
        .catch(error => weatherError(error));

    if (weather.get()['conditionCode'] && weather.get()['temperatureC']) {
        weatherIcon.href = "images/" + weather.get()['conditionCode'] + "small.png";
        weatherElement.text = Math.round(weather.get()['temperatureC']) + "°";
    } else {
        weatherError(null);
    }
}


function weatherError(error) {
    console.log("Issue fetching the weather.");
}


function updateBattery(battery) {
    batteryMeasure.text = battery.chargeLevel;
}


function updateActivity(today) {
    steps.text = today.adjusted.steps + "";
}


// Message is received
messaging.peerSocket.onmessage = evt => {
    if (evt.data.key === "textColour" && evt.data.newValue) {
        let color = JSON.parse(evt.data.newValue);
        time.style.fill = color;
        date.style.fill = color;
    }
    if (evt.data.key === "backgroundColour" && evt.data.newValue) {
        let color = JSON.parse(evt.data.newValue);
        background.style.fill = color;
    }
};


// Message socket opens
messaging.peerSocket.onopen = () => {
    console.log("App Socket Open");
};


// Message socket closes
messaging.peerSocket.onclose = () => {
    console.log("App Socket Closed");
};