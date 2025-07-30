let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// Get full country name
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Convert UNIX timestamp to readable date/time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

let city = "pune";

// Search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityInput = document.querySelector(".city_name");
  city = cityInput.value.trim();
  if (city !== "") {
    getWeatherData();
  }
  cityInput.value = "";
});

// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(1);
};

// Main weather fetch function
const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ADDYOURAPIKEY`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="weather icon" />`;

    // Convert Kelvin to Celsius manually here
    w_temperature.innerHTML = `${kelvinToCelsius(main.temp)}&#176;C`;
    w_minTem.innerHTML = `Min: ${kelvinToCelsius(main.temp_min)}&#176;C`;
    w_maxTem.innerHTML = `Max: ${kelvinToCelsius(main.temp_max)}&#176;C`;

    w_feelsLike.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176;C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};

// Load default city weather on page load
window.addEventListener("load", getWeatherData);
