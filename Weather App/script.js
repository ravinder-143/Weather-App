const apiKey = "6e67a4b4e0060947615cb27e35ed3898";

async function getWeather(){

const city = document.getElementById("city").value;

fetchWeather(city);

}

async function fetchWeather(city){

const result = document.getElementById("result");

const forecast = document.getElementById("forecast");

result.innerHTML="Loading...";
forecast.innerHTML="";

try{

const currentUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const response = await fetch(currentUrl);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

const weather = data.weather[0].main;

let icon="☀️";

if(weather==="Clouds") icon="☁️";
if(weather==="Rain") icon="🌧️";
if(weather==="Snow") icon="❄️";

result.innerHTML=`
<h2>${data.name}</h2>
<div style="font-size:60px">${icon}</div>
<p>🌡️ Temp: ${data.main.temp} °C</p>
<p>🌤️ Weather: ${weather}</p>
<p>💧 Humidity: ${data.main.humidity}%</p>
`;

const forecastUrl =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const forecastResponse = await fetch(forecastUrl);

const forecastData = await forecastResponse.json();

forecast.innerHTML="<h3>5-Day Forecast</h3>";

for(let i=0;i<5;i++){

const item = forecastData.list[i*8];

forecast.innerHTML += `
<div class="forecast-item">
<p>${item.dt_txt}</p>
<p>🌡️ ${item.main.temp} °C</p>
<p>${item.weather[0].main}</p>
</div>
`;

}

}
catch(error){

result.innerHTML=
"<p style='color:red'>City not found.</p>";

}

}

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(async(position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const response = await fetch(url);

const data = await response.json();

fetchWeather(data.name);

});

}

function toggleMode(){

document.body.classList.toggle("dark");

}