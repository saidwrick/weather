async function getWeather (location){
    const weatherData = {
        weather: "",
        temp: "",
        location: ""
    };

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=730d7317ea6bc6dfa5ccc9c7167776dd`, 
    {mode: 'cors'})
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            weatherData.weather = data.weather[0].main;
            weatherData.temp = (Math.round(data.main.temp-273.15) + "°C");
            weatherData.location = data.name;
        })
        .catch(function(err) {
            console.log("error");
            alert("not a valid location");
        });
    return weatherData;
}

function weatherDisplay (weather){
    const weatherDiv = document.querySelector(".weather");
    weatherDiv.innerHTML = weather;
}

function tempDisplay (temp){
    const tempDiv = document.querySelector(".temp");
    tempDiv.innerHTML = temp;
}

function locationDisplay (location){
    const locationDiv = document.querySelector(".location");
    locationDiv.innerHTML = location;
}

async function buttonPress(){
    const currentWeather = await getWeather(input.value);
    console.log(currentWeather);
    weatherDisplay(currentWeather.weather);
    tempDisplay(currentWeather.temp);
    locationDisplay(currentWeather.location);
}

const input = document.querySelector(".input");
const button = document.querySelector(".go");
button.addEventListener('click', buttonPress);
input.addEventListener('keyup', function(event){
    if (event.keyCode === 13){
        buttonPress();
    }
});