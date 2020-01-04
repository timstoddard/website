import axios, { AxiosResponse } from 'axios'

let successFn = (_: any): void => {}
let reloadWeatherTimer: number = null

// Lat/long and weather data currently stays until manually reset
// const hasLocationDataInLocalStorage = () =>
//   get('locationData') !== null
const hasWeatherDataInLocalStorage = (): boolean =>
  get('weatherData') !== null &&
  get('weatherDataTimestamp') !== null

/**
 * Returns true if the timestamp is more than an
 * 15 mins old, or if a new hour has started since
 * the timestamp was set; false otherwise.
 */
const needNewWeatherData = (): boolean => {
  const time1 = new Date()
  const time2 = new Date(parseInt(get('weatherDataTimestamp'), 10))
  const timeDifferenceInMinutes = Math.floor(Math.abs(time2.valueOf() - time1.valueOf()) / (60 * 1000))
  return timeDifferenceInMinutes > 15 ? true : time1.getHours() !== time2.getHours()
}

const getLocation = (): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (location: Position): void => {
        const locationData = `${location.coords.latitude},${location.coords.longitude}`
        getWeatherData(locationData)
        set('locationData', locationData)
      },
      (): void => getZipCode(),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 })
  } else {
    getZipCode()
  }
}

const getZipCode = (): void => {
  let zipCode = prompt('There was an error determining your location.\nPlease enter your 5 digit zip code.')
  if (zipCode !== null) {
    while (!(zipCode.match(/\d{5}/) || zipCode.match(/\d{5}[- ]?\d{4}/))) {
      zipCode = prompt('The zip code you entered is invalid.\nPlease enter your 5 digit zip code.')
    }
    getWeatherData(zipCode)
    set('locationData', zipCode)
  }
}

const getWeatherData = (locationData: string): void => {
  locationData = 'autoip' // TODO: add ability to switch to navigator.geolocation instead
  getWeatherDataHttp(
    `https://api.wunderground.com/api/8d7d14e295f9150a/conditions/forecast10day/astronomy/q/${locationData}.json`)
  reloadWeatherTimer = setInterval(() => {
    getWeatherDataHttp(
      `https://api.wunderground.com/api/8d7d14e295f9150a/conditions/forecast10day/astronomy/q/${locationData}.json`)
  }, 900000 /* 15 mins */) as unknown as number
}

const getWeatherDataHttp = (url: string): void => {
  axios.get(url)
    .then((response: AxiosResponse) => {
      successFn(response.data)
    })
    .catch((error: Error) => {
      alert('Weather data failed to load.')
      console.error(error) // tslint:disable-line:no-console
    })
}

export const showWeather = (success: (_: any) => void): void => {
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

export const get = (key: string): any => JSON.parse(localStorage.getItem(key))
export const set = (key: string, item: any): void => localStorage.setItem(key, JSON.stringify(item))
export const secureImg = (img: string): string => `https://icons.wxug.com/i/c/v4/${img}.svg`
export const cancelReloadWeatherTimer = (): void => clearInterval(reloadWeatherTimer)

const formatTimeOfDay = (now: Date): string => {
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

export const createWelcomeMessage = (now: Date, name: string): string => {
  const timeOfDay = formatTimeOfDay(now)
  return name
    ? `Good ${timeOfDay}, ${name}!`
    : `Good ${timeOfDay}!`
}

export const createDateString = (now: Date): string => {
  const day = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'
    .split('|')[now.getDay()]
  const month = 'January|February|March|April|May|June|July|August|September|October|November|December'
    .split('|')[now.getMonth()]
  return `${day}, ${month} ${now.getDate()}, ${now.getFullYear()}`
}

export const formatTime = (now: Date): string => {
  const hours = now.getHours()
  const h = hours > 12 ? hours - 12 : (hours > 0 ? hours : 12)
  const minutes = now.getMinutes()
  const m = `${minutes < 10 ? '0' : ''}${minutes}`
  const seconds = now.getSeconds()
  const s = `${seconds < 10 ? '0' : ''}${seconds}`
  const ampm = `${hours >= 12 ? 'PM' : 'AM'}`
  return `${h}:${m}:${s} ${ampm}`
}

export const reloadWeatherData = (setReloading: (reloading: boolean) => void): void => {
  localStorage.removeItem('locationData')
  localStorage.removeItem('weatherData')
  localStorage.removeItem('weatherDataTimestamp')
  getLocation()
  setReloading(true)
}
