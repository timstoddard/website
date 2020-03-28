import classNames from 'classnames'
import * as React from 'react'
import StartUtils, { get } from './Utils'

const styles = require('./scss/Weather.scss') // tslint:disable-line no-var-requires

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
    await StartUtils.getWeatherData()
    this.setState({
      currentWeather: get('weatherData'),
      forecast: get('weatherForecast'),
    })
  }

  getForecastItemDt = (dt: number): JSX.Element => {
    const dateAndTime = StartUtils.getDateTimeShort(new Date(dt * 1000))
    return (<>
      <span>{dateAndTime.date} {dateAndTime.hour}</span>
      <span className={styles.weather__forecastItem__dt__ampm}>
        {dateAndTime.ampm}
      </span>
    </>)
  }

  formatTemp = (degrees: number): JSX.Element => {
    return (<span style={{ alignItems: 'baseline' }}>
      <span>{degrees.toFixed(1)}</span>
      <span style={{ fontSize: '0.7em' }}>
        &deg;F
      </span>
    </span>)
  }

  render(): JSX.Element {
    const {
      getForecastItemDt,
      formatTemp,
    } = this
    const {
      className,
    } = this.props
    const {
      currentWeather,
      forecast,
    } = this.state

    return (
      <div className={classNames(styles.weather, className)}>
        {currentWeather ? (
          <>
            <img
              src={StartUtils.secureImg(currentWeather.weather[0].icon)}
              alt={currentWeather.weather[0].description}
              title={currentWeather.weather[0].description}
              className={styles.weather__icon} />
            <div className={styles.weather__temp}>
              <div className={styles['weather__temp--current']}>
                {formatTemp(currentWeather.main.temp)}
              </div>
              <div className={styles['weather__temp--high']}>
                {formatTemp(currentWeather.main.temp_max)}
              </div>
              <div className={styles['weather__temp--low']}>
                {formatTemp(currentWeather.main.temp_min)}
              </div>
            </div>
            {forecast.map((data: Forecast) => (
              <div
                key={data.dt}
                className={styles.weather__forecastItem}>
                <div className={styles.weather__forecastItem__dt}>
                  {getForecastItemDt(data.dt)}
                </div>
                <div className={styles.weather__forecastItem__temp}>
                  {formatTemp(data.main.temp)}
                </div>
                <img
                  src={StartUtils.secureImg(data.weather[0].icon)}
                  alt={data.weather[0].description}
                  title={data.weather[0].description}
                  className={styles.weather__forecastItem__icon} />
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
