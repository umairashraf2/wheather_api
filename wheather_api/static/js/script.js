const apiKey = "9d0c1fd19d653e7c06862d8ed0e5a277";
const unsplashApiKey = "YhEz3svD2DyCib9dE36KAbAoXPfpDbt4SMvwisvhiQc";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const unsplashUrl = "https://api.unsplash.com/search/photos";

document.getElementById("weatherForm").addEventListener("submit", (event) => {
	event.preventDefault();
	getWeatherData();
});

document.getElementById("getWeather").addEventListener("click", () => {
	getWeatherData();
});

function getWeatherData() {
	const cityOrZip = document.getElementById("cityOrZip").value;
	const isZipCode = /^\d+$/.test(cityOrZip); // Check if the input consists only of digits

	let searchParam;

	if (isZipCode) {
		searchParam = `zip=${cityOrZip}`;
	} else {
		searchParam = `q=${cityOrZip}`;
	}

	showLoader();
	fetch(`${weatherUrl}?${searchParam}&appid=${apiKey}&units=imperial`)
		.then((response) => response.json())
		.then((data) => {
			hideLoader();
			const weatherData = {
				name: data.name,
				high: data.main.temp_max,
				low: data.main.temp_min,
				forecast: data.weather[0].description,
				humidity: data.main.humidity,
			};
			displayWeatherData(weatherData);
			fetchCityImage(cityOrZip);
		})
		.catch((error) => {
			hideLoader();
			console.error("Error:", error);
		});
}

getWeatherData();

function showLoader() {
	const spinner = document.getElementById("spinner");
	if (spinner) {
		spinner.classList.remove("d-none");
	}
}

function hideLoader() {
	const spinner = document.getElementById("spinner");
	if (spinner) {
		spinner.classList.add("d-none");
	}
}

function displayWeatherData(weatherData) {
	const weatherDataDiv = document.getElementById("weatherData");
	const weatherCityDiv = document.getElementById("weatherCity");
	weatherCityDiv.innerHTML = `<h5 class="card-title">${weatherData.name}</h5>`;
	weatherDataDiv.innerHTML = `
		<li class="list-group-item"><strong>High: </strong> ${weatherData.high}&deg;F</li>
		<li class="list-group-item"><strong>Low: </strong> ${weatherData.low}&deg;F</li>
		<li class="list-group-item"><strong>Forecast: </strong> ${weatherData.forecast}</li>
		<li class="list-group-item"><strong>Humidity: </strong> ${weatherData.humidity}%</li>
    `;
}

function fetchCityImage(cityOrZip) {
	fetch(
		`${unsplashUrl}?query=${cityOrZip}&client_id=${unsplashApiKey}&per_page=1`
	)
		.then((response) => response.json())
		.then((data) => {
			const imageUrl = data.results[0].urls.regular;
			displayCityImage(imageUrl);
		})
		.catch((error) => console.error("Error:", error));
}

function displayCityImage(imageUrl) {
	const cityImageDiv = document.getElementById("cityImage");
	cityImageDiv.innerHTML = `<img src="${imageUrl}" alt="City Image" class="card-img-top">`;
}
