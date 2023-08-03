const presentDay = document.getElementById("current-day");
const monthAndYear = document.getElementById("Month-and-Year");
const humidityElement = document.querySelector(".humidity");
const input = document.getElementById("location");
const cityName = document.querySelector(".city");
const weatherIcon = document.getElementById("weather-icon");
const temperatureDegree = document.querySelector(".temp-degree");
const temperatureDescription = document.querySelector(".temp-description");
const latElement = document.querySelector(".lat");
const longElement = document.querySelector(".long");

const day1 = document.querySelector("day-1");
const day2 = document.querySelector("day-2");
const day3 = document.querySelector("day-3");
const day4 = document.querySelector("day-4");

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const apiKey = "d2ac27d2600f53d53f942008d727564f";
let lat;
let long;

function getCurrentDateDetails() {
  const currentDate = new Date();
  const currentDateString = currentDate.toDateString();
  const getDay = currentDateString.split(" ").slice(0, 1).join(" ");
  const getMonthAndYear = currentDateString.split(" ").slice(1, 4).join(" ");

  presentDay.innerText = getDay;
  monthAndYear.innerText = getMonthAndYear;

  const dayNumber = currentDate.getDay();
  const WeekDay = daysOfTheWeek[dayNumber];
}

function getLocationAndFetchWeatherData() {
  navigator.geolocation.getCurrentPosition(AccessedLocation);
}

function AccessedLocation(position) {
  if ("geolocation" in navigator) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    fetchWeatherData(lat, long);
  } else {
    console.error("Geolocation is not supported");
  }
}

function fetchWeatherData(lat, long) {
  const weatherByLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  getWeatherDetailsFromApi(weatherByLocationUrl);
}

async function getWeatherDetailsFromApi(weatherUrl) {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error("Weather data not available for this location");
    }
    const data = await response.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    displayError(Error);
  }
}

function displayData(data) {
  cityName.innerText = data.name;
  temperatureDescription.innerText = data.weather[0].description;
  const tempDeg = parseFloat(data.main.temp - 273).toFixed(1);
  temperatureDegree.innerText = `${tempDeg}°C`;

  const parsedLat = parseFloat(data.coord.lat).toFixed(1);
  const parsedLon = parseFloat(data.coord.lon).toFixed(1);
  latElement.innerText = `${parsedLat}°C`;
  longElement.innerText = `${parsedLon}°C`;

  const humidity = data.main.humidity;
  humidityElement.innerText = `${humidity}%`;

  const icon = data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function displayError(Err) {
  if ((Err = "Weather data not available for this location")) {
    errorContainer.style.display = "block";

    setTimeout(() => {
      if ((errorContainer.style.display = "block")) {
        errorContainer.style.display = "none";
        let inputValue = input.value;
      }
    }, 3000);
  }
}

// Initial setup
getCurrentDateDetails();
getLocationAndFetchWeatherData();
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const inputValue = input.value;
    const wweatherByCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
    const WeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`;

    getWeatherDetailsFromApi(wweatherByCityUrl);
    dailyForecast(WeatherForecast);
  }
});

async function dailyForecast(WeatherForecast) {
  try {
    const response = await fetch(WeatherForecast);
    if (!response.ok) {
      throw new Error("Cannot access data in this location");
    }
    let data = await response.json();
    console.log(data);
    displayForecast(data);
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
  let dailyForecastArray = data.list;
  let DateTxt = data.list[0].dt_txt;
}
