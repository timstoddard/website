import React, { Component } from 'react'

import * as Utils from './Utils'

import InfoBar from './InfoBar'
import Links from './Links'
import MainContent from './MainContent'

class Start extends Component {
  constructor(props) {
    super(props)

    this.setReloading = this.setReloading.bind(this)

    this.state = {
      currentObservation: null,
      forecast: [],
      reloading: false
    }
  }

  componentDidMount() {
    const success = ((response) => {
      this.setState({
        currentObservation: response.current_observation,
        forecast: response.forecast.simpleforecast.forecastday,
        reloading: false
      })
      Utils.set('weatherData', response)
      Utils.set('weatherDataTimestamp', Date.now())
    }).bind(this)
    Utils.showWeather(success)
  }

  componentWillUnmount() {
    Utils.cancelReloadWeatherTimer()
  }

  setReloading(value) {
    this.setState({ reloading: value })
  }

  render() {
    document.title = 'Start'
    return (
      <div>
        <InfoBar
          currentObservation={this.state.currentObservation}
          reloading={this.state.reloading}
          setReloading={this.setReloading}
          />
        <div className="start row">
          <Links className="col s12 m3 l2" />
          <MainContent
            className="col s12 m9 l10"
            forecast={this.state.forecast}
            />
        </div>
      </div>
    )
  }
}

export default Start
