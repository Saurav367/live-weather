const inputE1 = document.getElementById("city-input");
const buttonE1 = document.getElementById("get-weather-btn");
const temperatureE1 = document.getElementById("temperature");
const descriptionE1 = document.getElementById("description");
const feelslikeE1 = document.getElementById("feels-like");
const humidityE1 = document.getElementById("humidity");
const windspeedE1 = document.getElementById("wind-speed");



const apikey = 'f7a878385d40e108bf646259f9a01f69'; 

async function fetchWeather() {
    const inputValue = inputE1.value;

    if (!inputValue) {
        alert("Please enter a city name.");
        return; 
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else if (response.status === 401) {
                throw new Error("Invalid API key"); 
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        const data = await response.json();
        console.log(data);

      
        temperatureE1.textContent = `${data.main.temp}°C`;
        descriptionE1.textContent = data.weather[0].description;
        feelslikeE1.textContent = `feels like ${data.main.feels_like}°C`
        humidityE1.textContent = `humidity :${data.main.humidity}%`
        windspeedE1.textContent = `wind speed: ${data.wind.speed}m/s`

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert(error.message); 
    }
}

buttonE1.addEventListener("click" , fetchWeather);