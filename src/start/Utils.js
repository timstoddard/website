let successFn = () => { }
let reloadWeatherTimer = null

// Lat/long and weather data currently stays until manually reset
// const hasLocationDataInLocalStorage = () =>
//   get('locationData') !== null
const hasWeatherDataInLocalStorage = () =>
  get('weatherData') !== null &&
  get('weatherDataTimestamp') !== null

/**
 * Returns true if the timestamp is more than an
 * 15 mins old, or if a new hour has started since
 * the timestamp was set; false otherwise.
 */
const needNewWeatherData = () => {
  const time1 = new Date()
  const time2 = new Date(parseInt(get('weatherDataTimestamp'), 10))
  const timeDifferenceInMinutes = Math.floor(Math.abs(time2 - time1) / (60 * 1000))
  return timeDifferenceInMinutes > 15 ? true : time1.getHours() !== time2.getHours()
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const locationData = `${location.coords.latitude},${location.coords.longitude}`
        getWeatherData(locationData)
        set('locationData', locationData)
      },
      () => getZipCode(),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 })
  } else {
    getZipCode()
  }
}

const getZipCode = () => {
  let zipCode = prompt('There was an error determining your location.\nPlease enter your 5 digit zip code.')
  if (zipCode !== null) {
    while (!(zipCode.match(/\d{5}/) || zipCode.match(/\d{5}[- ]?\d{4}/))) {
      zipCode = prompt('The zip code you entered is invalid.\nPlease enter your 5 digit zip code.')
    }
    getWeatherData(zipCode)
    set('locationData', zipCode)
  }
}

const getWeatherData = (locationData) => {
  locationData = 'autoip' // TODO: add ability to switch to navigator.geolocation instead
  getWeatherDataAjax(`https://api.wunderground.com/api/8d7d14e295f9150a/conditions/forecast10day/astronomy/q/${locationData}.json`)
  reloadWeatherTimer = setInterval(() => {
    getWeatherDataAjax(`https://api.wunderground.com/api/8d7d14e295f9150a/conditions/forecast10day/astronomy/q/${locationData}.json`)
  }, 900000)
}

const getWeatherDataAjax = (url) => {
  $.ajax({
    url,
    type: 'GET',
    success: successFn,
    /* eslint-disable no-console */
    error: () => console.log('weather data failed to load'),
    /* eslint-enable no-console */
    timeout: 30000,
  })
}

export const showWeather = (success) => {
  successFn = success
  // if (hasLocationDataInLocalStorage()) {
  if (hasWeatherDataInLocalStorage()) {
    if (!needNewWeatherData()) {
      successFn(get('weatherData'))
    } else {
      getWeatherData(get('locationData'))
    }
  } else {
    getWeatherData(get('locationData'))
  }
  // } else {
  //   getLocation();
  // }
}

export const get = (key) => JSON.parse(localStorage.getItem(key))
export const set = (key, item) => localStorage.setItem(key, JSON.stringify(item))
export const secureImg = (img) => `https://icons.wxug.com/i/c/v4/${img}.svg`
export const cancelReloadWeatherTimer = () => clearInterval(reloadWeatherTimer)

const formatTimeOfDay = (now) => {
  const hours = now.getHours()
  if (hours < 12) {
    return 'Morning'
  } else if (hours < 18) {
    return 'Afternoon'
  } else if (hours < 21) {
    return 'Evening'
  }
  return 'Night'
}

export const createWelcomeMessage = (now) => {
  const name = localStorage.getItem('name')
  const timeOfDay = formatTimeOfDay(now)
  return name
    ? `Good ${timeOfDay}, ${name}!`
    : `Good ${timeOfDay}!`
}

export const createDateString = (now) => {
  const day = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'
    .split('|')[now.getDay()]
  const month = 'January|February|March|April|May|June|July|August|September|October|November|December'
    .split('|')[now.getMonth()]
  return `${day} ${month} ${now.getDate()}, ${now.getFullYear()}`
}

export const formatTime = (now) => {
  const hours = now.getHours()
  const h = hours > 12 ? hours - 12 : (hours > 0 ? hours : 12)
  const minutes = now.getMinutes()
  const m = `${minutes < 10 ? '0' : ''}${minutes}`
  const seconds = now.getSeconds()
  const s = `${seconds < 10 ? '0' : ''}${seconds}`
  const ampm = `${hours >= 12 ? 'PM' : 'AM'}`
  return `${h}:${m}:${s} ${ampm}`
}

export const reloadWeatherData = (setReloading) => {
  localStorage.removeItem('locationData')
  localStorage.removeItem('weatherData')
  localStorage.removeItem('weatherDataTimestamp')
  getLocation()
  setReloading(true)
}
