function showDateTime(timestamp) {
  let date = new Date(timestamp)
  let hour = date.getHours()
  if (hour < 10) {
    hour = `0${hour}`
  }
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[date.getDay()]
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  let month = months[date.getMonth()]

  return `${date.getFullYear()}/${month}/${date.getDate()} ${hour}:${minutes}`
}

function showForecast(response) {
  let forecastElement = document.querySelector('#forecast')

  let days = ['Thu', 'Fri', 'Sat', 'Sun']

  let forecastHTML = `<div class="row">`
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML
  console.log(forecastHTML)
}

function getForecast(coordinates) {
  console.log(coordinates)
  let apiKey = '384b4ddb18472833708d25e324b56156'
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid={apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(showForcast)
}

function showTemperature(response) {
  let temperatureElement = document.querySelector('#temperature')
  let cityElement = document.querySelector('#city')
  let descriptionElement = document.querySelector('#description')
  let humidElement = document.querySelector('#humidity')
  let windElelment = document.querySelector('#wind')
  let dateElement = document.querySelector('#dateTime')
  let iconElement = document.querySelector('#icons')

  celsiusTemperature = response.data.main.temp

  temperatureElement.innerHTML = Math.round(celsiusTemperature)
  cityElement.innerHTML = response.data.name
  descriptionElement.innerHTML = response.data.weather[0].description
  humidElement.innerHTML = response.data.main.humidity
  windElelment.innerHTML = response.data.wind.speed
  dateElement.innerHTML = showDateTime(response.data.dt * 1000)
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )
  iconElement.setAttribute(alt, response.data.weather[0], description)
  getForecast(response.data.coords)
}

function handleSubmit(event) {
  event.preventDefault()
  let searchElement = document.querySelector('#search-input')
  search(searchElement.value)
}

function search(city) {
  let apiKey = '384b4ddb18472833708d25e324b56156'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature)
}

function showFahrenheit(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('#temperature')
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32
  temperatureElement.innerHTML = Math.round(fahrenheitTemp)
  celsiusTemp.classList.remove('active')
  fahrenheitLink.classList.add('active')
}

function showCelsius(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('#temperature')
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
  celsiusTemp.classList.add('active')
  fahrenheitLink.classList.remove('active')
}

function showLocation(position) {
  let myKey = `384b4ddb18472833708d25e324b56156`
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${myKey}&units=metric`
  axios.get(apiUrl).then(showTemperature)
}

function getCurrentLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(showLocation)
}

let celsiusTemperature = null

let form = document.querySelector('#search-form')
form.addEventListener('submit', handleSubmit)

let celsiusTemp = document.querySelector('#celsius')
celsiusTemp.addEventListener('click', showCelsius)

let fahrenheitLink = document.querySelector('#fahrenheit')
fahrenheitLink.addEventListener('click', showFahrenheit)

let currentLocation = document.querySelector('#location')
currentLocation.addEventListener('click', getCurrentLocation)

search('Tel Aviv')
showForecast('Tel Aviv')
