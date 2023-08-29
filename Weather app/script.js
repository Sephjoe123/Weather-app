const presentDay = document.getElementById("current-day");
const monthAndYear = document.getElementById("Month-and-Year");
const input = document.getElementById("location");
const temperatureDegree = document.querySelector(".temp-degree");
const temperatureDescription = document.querySelector(".temp-description");
const WindSpeed = document.querySelector(".Wind-speed");
const Pressure = document.querySelector(".prec");
const humidityElement = document.querySelector(".humidity");

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
    
    
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`;
    getForecastDetailsFromApi(forecastUrl);
  } else {
    console.error("Geolocation is not supported");
  }
}

async function getForecastDetailsFromApi(forecastUrl) {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error("Forecast data not available for this location");
    }
    const data = await response.json();
    displayForecast(data); // Call the displayForecast function to show forecast data
  } catch (error) {
    console.log(error);
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
    displayData(data);
    console.log(data);
    
  } catch (error) {
    displayError(error);
    console.log(error);
  }
}

function displayData(data) {

  const cityName = document.querySelector(".city");
  cityName.innerText = data.name;

  temperatureDescription.innerText = data.weather[0].description;
  const tempDeg = parseFloat(data.main.temp - 273).toFixed(1);
  temperatureDegree.innerText = `${tempDeg}°C`;

  const parsedLat = parseFloat(data.coord.lat).toFixed(1);
  const parsedLon = parseFloat(data.coord.lon).toFixed(1);

  humidityElement.innerText = `${data.main.humidity}%`;
  WindSpeed.innerText = `${data.wind.speed}m/s`;
  Pressure.innerText = `${data.main.pressure}pa`

  const weatherIcon = document.getElementById("weather-icon");
  const icon = data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function displayError(error) {
  const errorContainer = document.querySelector(".error-container");
  if (
    error.message === "Weather data not available for this location" ||
    error.message === "Cannot access data in this location"
  ) {
    errorContainer.style.display = "block";

    setTimeout(() => {
      if (errorContainer.style.display === "block") {
        errorContainer.style.display = "none";
      }
    }, 3000);
  }
}
// Initial setup
getCurrentDateDetails();
getLocationAndFetchWeatherData();

const handleKeyPress = async (e) => {
  const DetailsContainer = document.querySelector(".fetching-details");
  if (e.key === "Enter") {
    const inputValue = input.value;
    const wweatherByCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
    const WeatherForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`;

    DetailsContainer.style.display = "block";

    await getWeatherDetailsFromApi(wweatherByCityUrl);
    await dailyForecast(WeatherForecast);

    DetailsContainer.style.display = "none";
  }
};

input.addEventListener("keypress", handleKeyPress);

async function dailyForecast(WeatherForecast) {
  try {
    const response = await fetch(WeatherForecast);
    if (!response.ok) {
      throw new Error("Cannot access data in this location");
    }
    let data = await response.json();

    displayForecast(data);
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
  let dailyForecast;
  let DateArray = [];
  dailyForecast = data.list.filter((dates) => {
    const uniqueDates = new Date(dates.dt_txt).getDate();
    if (!DateArray.includes(uniqueDates)) {
      return DateArray.push(uniqueDates);
    }
  });
  inputForecastData(dailyForecast);
}

function inputForecastData(data) {
  
  let DailyTempArr = [];

  for (let i = 0; i < data.length; i++) {
    const uniqueTemp = data[i].main.temp;
    DailyTempArr.push(uniqueTemp);
  }

  const uniqueTemperatures = new Set(DailyTempArr);
  const uniqueTemperaturesArray = Array.from(uniqueTemperatures);


  for(let i = 0; i <= 3 ; i++){ 
    document.querySelector(`.temp${i + 1}`).innerText = parseFloat(uniqueTemperaturesArray[i] - 273).toFixed(1);
  }


  let icon1 = data[0].weather[0].icon;
  let icon2 = data[1].weather[0].icon;
  let icon3 = data[2].weather[0].icon;
  let icon4 = data[3].weather[0].icon;

  document
    .querySelector(".weather-forecast-icon")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon1}@2x.png`);

  document
    .querySelector(".weather-forecast-icon-1")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon2}@2x.png`);

  document
    .querySelector(".weather-forecast-icon-2")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon3}@2x.png`);

  document
    .querySelector(".weather-forecast-icon-3")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon4}@2x.png`);

  let dayArray = [];
  for (let i = 0; i < data.length; i++) {
    const timestamp = data[i].dt * 1000;
    const date = new Date(timestamp);
    const weekDays = date.getDay();

    dayArray.push(daysOfTheWeek[weekDays].split("").slice(0, 3).join(""));

    for (let i = 1; i <= 3; i++) {
      document.querySelector(`.day-${i + 1}`).innerText = dayArray[i];
    }
  }
}
