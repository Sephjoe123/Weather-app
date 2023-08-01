let currentDate = new Date();
let presentDay = document.getElementById("current-day");
let MonthAndYear = document.getElementById("Month-and-Year");

let currentDateString = currentDate.toString();
let getDay = currentDateString.split(" ").slice(0,1).join(" ");
let getMonthAndYear = currentDateString.split(" ").slice(1,4).join(" ");

let input = document.getElementById("location")

presentDay.innerText = getDay;
MonthAndYear.innerText = getMonthAndYear


document.addEventListener("DOMContentLoaded", () =>{
    navigator.geolocation.getCurrentPosition(AccessedLocation)
})

let lat;
let long;


function AccessedLocation(position){
    if("geolocation" in navigator){
        lat = position.coords.latitude;
        long = position.coords.longitude;
        fetchWeatherData(lat,long);
    }
 
    else{
        return "Geolocation is not supported"
    }

}

function fetchWeatherData(){

let myApiKey = "d2ac27d2600f53d53f942008d727564f"
const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myApiKey}`;

fetch(WeatherUrl)
.then(response => response.json())
.then(data =>  console.log(data))

}

input.addEventListener("keypress",getWeatherDetails)

 function getWeatherDetails(e){
 if(e.key === "Enter"){
    
 }
 }

