let apiKey = "523328191cb42f7e509a7d1cfe8f3757";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;
let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=Madrid&appid=${apiKey}&units=metric`;
//Format date
function formatDate(timestamp) {
	let now = new Date(timestamp);
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[now.getDay()];
	return `${day} ${UpdateHours(timestamp)}`;
}

//Format hours for the forecast
function UpdateHours(timestamp) {
	let now = new Date(timestamp);
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let min = now.getMinutes();
	if (min < 10) {
		min = `0${min}`;
	}
	return `${hour}:${min}`;
}

//Obtain info
function updateTemperature(response) {
	let tempOk = Math.round(response.data.main.temp);
	celsiusTemp = response.data.main.temp;
	let temp_updated_c = document.querySelector("#temperature_units");
	temp_updated_c.innerHTML = `${tempOk}°C`;
	let city_updated = document.querySelector("#city_selected");
	city_updated.innerHTML = `${response.data.name}`;
	let description = document.querySelector("#weatherDescription");
	description.innerHTML = `${response.data.weather[0].description}`;
	let humidity_updated = document.querySelector("#humidityID");
	humidity_updated.innerHTML = `Humidity: ${response.data.main.humidity}%`;
	let wind_updated = document.querySelector("#windID");
	wind_updated.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
	kmSpeed = response.data.wind.speed;
	let date_for = document.querySelector("#date-formatted");
	date_for.innerHTML = formatDate(response.data.dt * 1000);
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
}
axios.get(apiUrl).then(updateTemperature);

//Update forecast
function updateForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	let forecast = null;
	forecastElement.innerHTML = null;

	for (let index = 0; index < 6; index++) {
		forecast = response.data.list[index];
		forecastElement.innerHTML += `
		<div class="col">
			${UpdateHours(forecast.dt * 1000)} <br />
			<img  src = "http://openweathermap.org/img/wn/${
				forecast.weather[0].icon
			}@2x.png"></i> <br />
			<span>
				<strong>${Math.round(forecast.main.temp_max)}°</strong> /${Math.round(
			forecast.main.temp_min
		)}°
			</span>
		</div>`;
	}
}
axios.get(apiUrlForecast).then(updateForecast);

//Search button
function update_city(event) {
	event.preventDefault();
	let city_selection = document.querySelector("#search-city");
	city_selected.innerHTML = city_selection.value;
	let apiKey = "523328191cb42f7e509a7d1cfe8f3757";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_selection.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(updateTemperature);
	let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city_selection.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrlForecast).then(updateForecast);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", update_city);

//Convert to celsius and km/h
function temp_cel(event) {
	event.preventDefault();
	let tempCel = Math.round(celsiusTemp);
	let speedKm = kmSpeed;
	let temp_updated_c = document.querySelector("#temperature_units");
	temp_updated_c.innerHTML = `${tempCel}°C`;
	let km_Speed = document.querySelector("#windID");
	km_Speed.innerHTML = `Wind: ${speedKm} km/h`;
}

let button_c = document.querySelector("#button-cel");
button_c.addEventListener("click", temp_cel);

//Convert to F and mph
function temp_fah(event) {
	event.preventDefault();
	let tempOk = Math.round(celsiusTemp * (9 / 5) + 32);
	let miles = Math.round((kmSpeed / 1.609) * 100) / 100;

	let temp_updated_f = document.querySelector("#temperature_units");
	temp_updated_f.innerHTML = `${tempOk}°F`;
	let milesSpeed = document.querySelector("#windID");
	milesSpeed.innerHTML = `Wind: ${miles} mph`;
}

let button_f = document.querySelector("#button-fah");
button_f.addEventListener("click", temp_fah);
let celsiusTemp = null;
let kmSpeed = null;

//Current location button
function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "523328191cb42f7e509a7d1cfe8f3757";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(updateTemperature);
	let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
	axios.get(apiUrlForecast).then(updateForecast);
}
navigator.geolocation.getCurrentPosition(showPosition);

function updateData(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrentLocation = document.querySelector("#currentLocation");
buttonCurrentLocation.addEventListener("click", updateData);
