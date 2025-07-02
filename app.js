const apiKey = "895a106621e39128ab7f155ea99295dd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
       // document.querySelector(".error p").textContent = "City not found!";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "image/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "image/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "image/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "image/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "image/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city === "") {
        alert("Enter the city name");
        return;
    }
    checkWeather(city);
});
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    searchBtn.click();      
  }
});
