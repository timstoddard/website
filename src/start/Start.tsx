import * as React from 'react'
import MainContent from './content/MainContent'
import Links from './Links'

interface State {
  currentObservation: any
  forecast: any[]
  reloading: boolean
}

export default class Start extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      currentObservation: null,
      forecast: [],
      reloading: false,
    }
  }

  componentDidMount(): void {
    /*Utils.showWeather((response: any): void => {
      this.setState({
        currentObservation: response.current_observation,
        forecast: response.forecast.simpleforecast.forecastday,
        reloading: false,
      })
      Utils.set('weatherData', response)
      Utils.set('weatherDataTimestamp', Date.now())
    })*/
  }

  componentWillUnmount(): void {
    // Utils.cancelReloadWeatherTimer()
  }

  setReloading = (value: boolean): void => {
    this.setState({ reloading: value })
  }

  render(): JSX.Element {
    document.title = 'Start'
    // const { currentObservation, reloading, forecast } = this.state

    return (
      <div className='start row'>
        <Links className='col s12 m3 l2' />
        <MainContent className='col s12 m9 l10' />
      </div>
    )
  }
}
