function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempnow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let myKey = `384b4ddb18472833708d25e324b56156`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myKey}`;

  axios.get(apiUrl).then(showWeather);
}

function changeName(event) {
  event.preventDefault();
  let targetName = document.querySelector("#city");
  targetName.innerHTML = document.querySelector("#cityname").value;
  searchCity(city);
}

function showLocation(position) {
  let myKey = `384b4ddb18472833708d25e324b56156`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${myKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let dateElement = document.querySelector("#date");
let currentTiem = new Date();
dateElement.innerHTML = formatDate(currentTiem);

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", changeName);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", showLocation);

searchCity("Tel Aviv");
