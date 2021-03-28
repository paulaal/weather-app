let apiKey = "523328191cb42f7e509a7d1cfe8f3757";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;

function formatDate(timestamp) {
	let now = new Date(timestamp);
	let hour = now.getHours();
	if (hour < 10) {
		hour = `0${hour}`;
	}
	let min = now.getMinutes();
	if (min < 10) {
		min = `0 ${min}`;
	}
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
	return `${day} ${hour}:${min}`;
}

function updateTemperature(response) {
	let tempOk = Math.round(response.data.main.temp);
	celsiusTemp = response.data.main.temp;
	let temp_updated_c = document.querySelector("#temperature_units");
	temp_updated_c.innerHTML = `${tempOk}°`;
	let city_updated = document.querySelector("#city_selected");
	city_updated.innerHTML = `${response.data.name}`;
	let humidity_updated = document.querySelector("#humidityID");
	humidity_updated.innerHTML = `Humidity: ${response.data.main.humidity}%`;
	let wind_updated = document.querySelector("#windID");
	wind_updated.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
	let date_for = document.querySelector("#date-formatted");
	date_for.innerHTML = formatDate(response.data.dt * 1000);
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
}
axios.get(apiUrl).then(updateTemperature);

function update_city(event) {
	event.preventDefault();
	let city_selection = document.querySelector("#search-city");
	city_selected.innerHTML = city_selection.value;
	let apiKey = "523328191cb42f7e509a7d1cfe8f3757";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_selection.value}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(updateTemperature);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", update_city);

function temp_cel(event) {
	event.preventDefault();
	let tempCel = Math.round(celsiusTemp);
	let temp_updated_c = document.querySelector("#temperature_units");
	temp_updated_c.innerHTML = `${tempCel}°`;
}

let button_c = document.querySelector("#button-cel");
button_c.addEventListener("click", temp_cel);

function temp_fah(event) {
	event.preventDefault();
	let tempOk = Math.round(celsiusTemp * (9 / 5) + 32);
	let temp_updated_f = document.querySelector("#temperature_units");
	temp_updated_f.innerHTML = `${tempOk}°`;
}

let button_f = document.querySelector("#button-fah");
button_f.addEventListener("click", temp_fah);
let celsiusTemp = null;

function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "523328191cb42f7e509a7d1cfe8f3757";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

	axios.get(apiUrl).then(updateTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function updateData(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrentLocation = document.querySelector("#currentLocation");
buttonCurrentLocation.addEventListener("click", updateData);
