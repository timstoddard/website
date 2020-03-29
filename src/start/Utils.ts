import axios from 'axios'

// TODO make these global shared functions?
export const get = <T>(key: string): T => JSON.parse(localStorage.getItem(key))
export const set = (key: string, item: unknown) => localStorage.setItem(key, JSON.stringify(item))

export class WeatherUtils {
  loadStoredAssets: () => void

  constructor(loadStoredAssets: () => void) {
    this.loadStoredAssets = loadStoredAssets
  }

  initWeather = (forceUpdate: boolean) => {
    // this.reloadWeatherData()

    // TODO use a service worker for managing this
    if (this.hasWeatherDataInLocalStorage()) {
      // use old data to have something painted on the screen
      // this.loadStoredAssets()

      if (forceUpdate) {
        this.reloadWeatherData()
      } else if (this.needNewWeatherData()) {
        if (this.hasLocationDataInLocalStorage()) {
          this.getWeatherData(get('locationData'))
        } else {
          this.reloadWeatherData()
        }
      } else {
        this.loadStoredAssets()
      }
    } else {
      this.reloadWeatherData()
    }
  }

  /**
   * Fetches the latest weather data.
   */
  private getWeatherData = async (locationData: { [key: string]: unknown }): Promise<void> => {
    const options = {
      // q: 'Sunnyvale,us',
      units: 'imperial',
      ...locationData,
    }
    const getResponse = async (path: string) =>
      await axios.get(this.getWeatherUrl(path, options))

    // load current weather
    try {
      const response = await getResponse('weather')
      set('weatherData', response.data)
    } catch (error) {
      console.error(error) // tslint:disable-line:no-console
    }

    // load weather forecast
    try {
      const response = await getResponse('forecast')
      set('weatherForecast', response.data.list)
    } catch (error) {
      console.error(error) // tslint:disable-line:no-console
    }

    // set weather timestamp
    set('weatherTimestamp', Date.now())

    // weather is now loaded, so let the component know
    this.loadStoredAssets()
  }

  /**
   * Returns true if there is existing weather data in local storage.
   */
  private hasWeatherDataInLocalStorage = () =>
    !!get('weatherData') &&
    !!get('weatherForecast') &&
    !!get('weatherTimestamp')

  /**
   * Returns true if there is existing location data in local storage.
   */
  private hasLocationDataInLocalStorage = () =>
    !!get('locationData')

  /**
   * Returns true if the timestamp is more than an
   * 10 mins old, or if a new hour has started since
   * the timestamp was set; false otherwise.
   */
  private needNewWeatherData = (): boolean => {
   if (this.hasWeatherDataInLocalStorage()) {
     const time1 = new Date()
     const time2 = new Date(parseInt(get('weatherTimestamp'), 10))
     const timeDifferenceInMinutes = Math.floor(Math.abs(time2.valueOf() - time1.valueOf()) / (60 * 1000))
     return timeDifferenceInMinutes > 10 ? true : time1.getHours() !== time2.getHours()
   } else {
    return true
   }
 }

 private getWeatherUrl = (path: string, params: { [key: string]: string }): string => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5'
    const appId = 'b3f6d7044a2fcd4f570c571be44776fe'
    const queryParams = [`APPID=${appId}`]
    for (const param in params) {
      queryParams.push(`${param}=${encodeURIComponent(params[param])}`)
    }
    return `${baseUrl}/${path}?${queryParams.join('&')}`
  }

  private reloadWeatherData = () => {
    localStorage.removeItem('locationData')
    localStorage.removeItem('weatherData')
    localStorage.removeItem('weatherForecast')
    localStorage.removeItem('weatherTimestamp')
    this.getLocation()
  }

  /**
   * Gets the lat/long of a user, otherwise asks for their zip code. This
   * location data is then used to fetch their local weather.
   */
  private getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location: Position) => {
          const locationData = {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          }
          this.getWeatherData(locationData)
          set('locationData', locationData)
        },
        () => this.getZipCode(),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 })
    } else {
      this.getZipCode()
    }
  }

  /**
   * Asks the user for their 5 digit zip code. Re-prompts while response is invalid.
   */
  private getZipCode = () => {
    const zipCodeMessage = (message: string) => `${message}\nPlease enter your 5 digit zip code.`
    let zipCode = prompt(zipCodeMessage('There was an error determining your location.'))
    if (zipCode !== null) {
      while (!zipCode.match(/^\d{5}$/)) {
        zipCode = prompt(zipCodeMessage('The zip code you entered is invalid.'))
      }
      const locationData = {
        zip: zipCode,
      }
      this.getWeatherData(locationData)
      set('locationData', locationData)
    }
  }
}

export class StartUtils {
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
