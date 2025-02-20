//api.openweathermap.org/data/2.5/weather?q=mumbai&appid=a5592017ab1a27f5f6b7eb27d2e6c53b&units=metric


const apiKey = "a5592017ab1a27f5f6b7eb27d2e6c53b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather_icon")


async function checkWeather(city) {
    const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(responce.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else{

        var data = await responce.json();

    console.log(data)

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %"
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"
 
    if(data.weather[0].main == "Clouds"){
         weatherIcon.src = "clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
         weatherIcon.src = "clear.png"
    }
    else if(data.weather[0].main == "Rain"){
         weatherIcon.src = "rain.png"
    }
    else if(data.weather[0].main == "Drizzel"){
         weatherIcon.src = "drizzel.png"
    }
    else if(data.weather[0].main == "Mist"){
         weatherIcon.src = "mist.png"
    }
    
    document.querySelector(".weather").style.display= "block";
    document.querySelector(".error").style.display = "none"


    }

    
}

// Add keyboard event listener for Enter key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Prevent default form submission behavior
        event.preventDefault();
        
        // Trigger the search
        checkWeather(searchBox.value);
        
        // Optional: Add visual feedback for the button
        searchbtn.style.transform = "scale(0.95)";
        setTimeout(() => {
            searchbtn.style.transform = "scale(1)";
        }, 100);
    }
});

// Keep the existing click event listener
searchbtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});






function updateDateTime() {
     const dateTimeElement = document.getElementById('dateTime');
     const now = new Date();

     const formattedDateTime = now.toLocaleString('en-US', {
         weekday: 'long' +"",
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         hour12: true
     });

     dateTimeElement.textContent = formattedDateTime;
 }

 setInterval(updateDateTime, 1000);

 
 updateDateTime();
