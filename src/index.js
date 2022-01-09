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
  return `${day} ${hour}:${minutes}`
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
}

function showCelsius(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector('#temperature')
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
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
