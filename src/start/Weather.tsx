import * as React from 'react'
import * as Utils from './Utils'

interface CurrentWeather {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

// interface ForecastResponse {
//   cod: string
//   message: number
//   cnt: number
//   list: Forecast[]
// }

interface Forecast {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

interface Props {
  className: string
}

interface State {
  currentWeather: CurrentWeather
  forecast: Forecast[]
}

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      currentWeather: null,
      forecast: [],
    }
  }

  async componentDidMount(): Promise<void> {
    await Utils.getWeatherData()
    this.setState({
      currentWeather: Utils.get('weatherData'),
      forecast: Utils.get('weatherForecast'),
    })
  }

  render(): JSX.Element {
    const { className } = this.props
    const {
      currentWeather,
      forecast,
    } = this.state

    return (
      <div className={`weather ${className}`}>
        {currentWeather ? (
          <>
            <img
              src={Utils.secureImg(currentWeather.weather[0].icon)}
              alt={currentWeather.weather[0].description}
              className='weather__icon' />
            <div className='weather__temp'>
              <div className='weather__temp--current'>
                {Utils.formatTemp(currentWeather.main.temp)}
              </div>
              <div className='weather__temp--high'>
                {Utils.formatTemp(currentWeather.main.temp_max)}
              </div>
              <div className='weather__temp--low'>
                {Utils.formatTemp(currentWeather.main.temp_min)}
              </div>
            </div>
            {forecast.map((data: Forecast) => (
              <div
                key={data.dt}
                className='weather__forecastItem'>
                <div className='weather__forecastItem__dt'>
                  {Utils.getDateTimeShort(new Date(data.dt * 1000))}
                </div>
                <div>
                  <div className='weather__forecastItem__temp'>
                    {Utils.formatTemp(data.main.temp)}
                  </div>
                  <img
                    src={Utils.secureImg(data.weather[0].icon)}
                    alt={data.weather[0].description}
                    className='weather__forecastItem__icon' />
                </div>
              </div>
            ))}
          </>
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}
