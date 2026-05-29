
const apiKey = "e00d0ee6222944a0a97102024262905";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");


// Search Button
searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if(city !== ""){
    getWeather(city);
  }

});


// Press Enter
cityInput.addEventListener("keypress", (event) => {

  if(event.key === "Enter"){

    const city = cityInput.value.trim();

    if(city !== ""){
      getWeather(city);
    }

  }

});


// Fetch Weather
async function getWeather(city){

  const apiUrl =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try{

    const response = await fetch(apiUrl);

    const data = await response.json();

    console.log(data);

    // Error Handling
    if(data.error){

      alert(data.error.message);

      return;

    }

    // Update UI
    cityName.innerText =
      data.location.name;

    temperature.innerText =
      `${Math.round(data.current.temp_c)}°C`;

    description.innerText =
      data.current.condition.text;

    humidity.innerText =
      `${data.current.humidity}%`;

    wind.innerText =
      `${data.current.wind_kph} km/h`;

    weatherIcon.src =
      "https:" + data.current.condition.icon;

  }
  catch(error){

    console.log(error);

    alert("Something went wrong");

  }

}


// Default Weather
getWeather("Kathmandu");
