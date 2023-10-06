const apiKey = "d2ac27d2600f53d53f942008d727564f";
let lat;
let long;


// getting geolocation details
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
  
  // Fetching current weather details
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

  
  // gettin weather details from forecastApi
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
