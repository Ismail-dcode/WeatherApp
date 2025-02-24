//api.openweathermap.org/data/2.5/weather?q=mumbai&appid=a5592017ab1a27f5f6b7eb27d2e6c53b&units=metric


const apiKey = "a5592017ab1a27f5f6b7eb27d2e6c53b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-container input");
const searchBtn = document.querySelector(".search-container button");
const weatherIcon = document.querySelector(".weather_icon");
const weatherContent = document.querySelector(".weather-content");

async function checkWeather(city) {
    try {
       
        weatherContent.style.opacity = "0.5";
        
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if(response.status == 404) {
            document.querySelector(".error-type").style.display = "block";
            weatherContent.style.display = "none";
        } else {
            const data = await response.json();
            
            // Update weather information
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            updateWeatherIcon(data.weather[0].main);
            
          
            weatherContent.style.display = "block";
            document.querySelector(".error-type").style.display = "none";
            
       
            updateLastUpdateTime();
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
    } finally {
   
        weatherContent.style.opacity = "1";
    }
}

function updateWeatherIcon(weatherMain) {
    const iconMap = {
        'Clouds': 'clouds.png',
        'Clear': 'clear.png',
        'Rain': 'rain.png',
        'Drizzle': 'drizzle.png',
        'Mist': 'mist.png',
        'Snow': 'snow.png',
        'Thunderstorm': 'thunderstorm.png'
    };
    weatherIcon.src = iconMap[weatherMain] || 'unknown.png';
}

function updateLastUpdateTime() {
    const lastUpdate = document.getElementById('lastUpdate');
    const now = new Date();
    lastUpdate.textContent = now.toLocaleTimeString();
}


searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


function updateDateTime() {
    const now = new Date();
    

    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    

    const dateDisplay = document.getElementById('dateDisplay');
    dateDisplay.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const timezoneDisplay = document.getElementById('timezoneDisplay');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneDisplay.textContent = timezone.replace('_', ' ');
}

// Initialize
setInterval(updateDateTime, 1000);
updateDateTime();
updateLastUpdateTime();
