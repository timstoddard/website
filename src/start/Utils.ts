import axios from 'axios'

// TODO make these global shared functions?
export const get = <T>(key: string): T => JSON.parse(localStorage.getItem(key))
export const set = (key: string, item: unknown): void => localStorage.setItem(key, JSON.stringify(item))

export default class StartUtils {
  // WEATHER

  /**
   * Fetches the latest weather data.
   */
  static getWeatherData = async (): Promise<void> => {
    // update data if needed
    if (StartUtils.needNewWeatherData()) {
      const options = {
        q: 'Sunnyvale,us',
        units: 'imperial',
      }

      // load current weather
      try {
        const response = await axios.get(StartUtils.getWeatherUrl('weather', options))
        set('weatherData', response.data)
        set('weatherTimestamp', Date.now())
      } catch (error) {
        console.error(error) // tslint:disable-line:no-console
      }

      // load weather forecast
      try {
        const response = await axios.get(StartUtils.getWeatherUrl('forecast', options))
        set('weatherForecast', response.data.list)
        set('weatherTimestamp', Date.now())
      } catch (error) {
        console.error(error) // tslint:disable-line:no-console
      }
    }
  }

  /**
   * Returns true if there is existing data in local storage.
   */
  static hasWeatherDataInLocalStorage = (): boolean =>
    !!get('weatherData') &&
    !!get('weatherForecast') &&
    !!get('weatherTimestamp')

  /**
   * Returns true if the timestamp is more than an
   * 10 mins old, or if a new hour has started since
   * the timestamp was set; false otherwise.
   */
 static needNewWeatherData = (): boolean => {
   if (StartUtils.hasWeatherDataInLocalStorage()) {
     const time1 = new Date()
     const time2 = new Date(parseInt(get('weatherTimestamp'), 10))
     const timeDifferenceInMinutes = Math.floor(Math.abs(time2.valueOf() - time1.valueOf()) / (60 * 1000))
     return timeDifferenceInMinutes > 10 ? true : time1.getHours() !== time2.getHours()
   } else {
    return false
   }
 }

  static getWeatherUrl = (path: string, params: { [key: string]: string }): string => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5'
    // TODO dont commit this
    const appId = "b3f6d7044a2fcd4f570c571be44776fe"
    const queryParams = [`APPID=${appId}`]
    for (const param in params) {
      queryParams.push(`${param}=${encodeURIComponent(params[param])}`)
    }
    return `${baseUrl}/${path}?${queryParams.join('&')}`
  }

  // TIME/DATE

  static createDateString = (date: Date): string => {
    const day = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'
      .split('|')[date.getDay()]
    const month = 'January|February|March|April|May|June|July|August|September|October|November|December'
      .split('|')[date.getMonth()]
    return `${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`
  }

  static formatTime = (date: Date): string => {
    const hours = date.getHours()
    const h = hours > 12 ? hours - 12 : (hours > 0 ? hours : 12)
    const minutes = date.getMinutes()
    const m = `${minutes < 10 ? '0' : ''}${minutes}`
    const seconds = date.getSeconds()
    const s = `${seconds < 10 ? '0' : ''}${seconds}`
    const ampm = hours >= 12 ? 'PM' : 'AM'
    return `${h}:${m}:${s} ${ampm}`
  }

  static getDateTimeShort = (date: Date): {
    date: string,
    hour: number,
    ampm: 'a' | 'p',
  } => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const hours = date.getHours()
    const ampm = hours >= 12 ? 'p' : 'a'
    return {
      date: `${month}/${day}`,
      hour: hours > 12 ? hours - 12 : (hours > 0 ? hours : 12),
      ampm,
    }
  }

  static formatTimeOfDay = (date: Date): string => {
    const hours = date.getHours()
    if (hours < 12) {
      return 'Morning'
    } else if (hours < 18) {
      return 'Afternoon'
    } else if (hours < 21) {
      return 'Evening'
    }
    return 'Night'
  }

  // MISC

  static secureImg = (iconId: string): string => `https://openweathermap.org/img/wn/${iconId}@2x.png`

  static createWelcomeMessage = (date: Date, name: string): string => {
    const timeOfDay = StartUtils.formatTimeOfDay(date)
    return name
      ? `Good ${timeOfDay}, ${name}!`
      : `Good ${timeOfDay}!`
  }
}

// TODO add back in location detection
// const hasLocationDataInLocalStorage = () =>
  //   get('locationData')

/*const getLocation = (): void => {
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
}*/

/*export const reloadWeatherData = (setReloading: (reloading: boolean) => void): void => {
  localStorage.removeItem('locationData')
  localStorage.removeItem('weatherData')
  localStorage.removeItem('weatherTimestamp')
  getLocation()
  setReloading(true)
}*/
