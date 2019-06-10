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
const guiDate = document.getElementById("date");
const time = document.getElementById("time");
const batteryMeasure = document.getElementById("battery-measure");
const weatherElement = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");
const background = document.getElementById("background");
const steps = document.getElementById("steps");
const heartRate = document.getElementById("heart-rate");

var sensors = [];
setWeather(weather);
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

    var day = util.getDay(date.getDay());
    var dateNo = date.getDate();
    guiDate.text = day + " " + dateNo;
    updateBattery(battery);
    updateActivity(today);
};


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


// Message is received
messaging.peerSocket.onmessage = evt => {
    if (evt.data.key === "textColour" && evt.data.newValue) {
        let color = JSON.parse(evt.data.newValue);
        time.style.fill = color;
        guiDate.style.fill = color;
    }
    if (evt.data.key === "backgroundColour" && evt.data.newValue) {
        let color = JSON.parse(evt.data.newValue);
        background.style.fill = color;
    }
};


function setWeather(weather) {
    weather = util.getWeatherUpdate(weather);
    weatherElement.text = util.getWeatherTemperature(weather);
    weatherIcon.href = "images/" + util.getWeatherConditionCode(weather) + "small.png";
}


function updateBattery(battery) {
    batteryMeasure.text = battery.chargeLevel;
}


function updateActivity(today) {
    steps.text = today.adjusted.steps + "";
}


// // Message socket opens
// messaging.peerSocket.onopen = () => {
//     console.log("App Socket Open");
// };
//
//
// // Message socket closes
// messaging.peerSocket.onclose = () => {
//     console.log("App Socket Closed");
// };