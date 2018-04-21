import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Utils from './Utils'

const colors = ['blue', 'red', 'yellow', 'green']

const LoadingAnimation = () =>
  (<div className="loading__icon preloader-wrapper small active">
    {colors.map((color) =>
      (<div
        key={color}
        className={`spinner-layer spinner-${color}`}>
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>)
    )}
   </div>)

const DEGREE = String.fromCharCode(176)
const WeatherForecastHeader = ({ className, currentObservation, reloading, setReloading }) =>
  (<div className={className}>
    {currentObservation
      ? (
        <div className="weatherForecastHeader">
          <img
            src={Utils.secureImg(currentObservation.icon)}
            alt={currentObservation.icon}
            className="weatherForecastHeader__icon--weather"
          />
          <div className="weatherForecastHeader__city">
            {`${currentObservation.display_location.city}: ${currentObservation.temp_f}${DEGREE}F`}
            {Math.abs(currentObservation.temp_f - currentObservation.feelslike_f) > 2 && (
              <span className="weatherForecastHeader__feelsLike">
                {` (Feels like ${currentObservation.feelslike_f}${DEGREE}F)`}
              </span>
            )}
          </div>
          {reloading
            ? <LoadingAnimation />
            : (
              <img
                src="../../media/icons/reload.svg"
                alt="Reload"
                role="button"
                onClick={() => Utils.reloadWeatherData(setReloading)}
                className="weatherForecastHeader__icon--reload"
              />
            )}
        </div>
      )
      : (
        <div className="weatherForecastHeader">
          <div className="weatherForecastHeader__loading">
            Loading weather...
          </div>
          <LoadingAnimation />
        </div>
      )
    }
   </div>)

WeatherForecastHeader.propTypes = {
  className: PropTypes.string,
  currentObservation: PropTypes.object,
  reloading: PropTypes.bool,
  setReloading: PropTypes.func,
}

export default class InfoBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      now: new Date(),
      name: '',
    }

    this.checkForSavedName = this.checkForSavedName.bind(this)
    this.updateTime = this.updateTime.bind(this)
  }

  componentDidMount() {
    this.checkForSavedName()
    this.updateTime()
  }

  componentWillUnmount() {
    clearTimeout(this.nowTimer)
  }

  checkForSavedName() {
    const url = window.location.href
    const index = url.indexOf('?')
    if (index === -1) return

    let name = url.substring(index + 1).trim()
    if (name.length == 0) return

    try {
      name = decodeURIComponent(name)
      this.setState({ name })
      localStorage.setItem('name', name)
    }
    /* eslint-disable no-empty */
    catch (e) { }
    /* eslint-enable no-empty */
  }

  updateTime() {
    const now = new Date()
    this.setState({ now })
    const millis = now.getMilliseconds()
    this.nowTimer = setTimeout(this.updateTime, 1000 - millis)
  }

  render() {
    const { currentObservation, reloading, setReloading } = this.props
    const { now } = this.state
    return (
      <div className="infoBar cyan accent-3 black-text z-depth-1">
        <div className="infoBar__item">
          {Utils.createWelcomeMessage(now)}
        </div>
        <div className="infoBar__item">
          {Utils.createDateString(now)}
        </div>
        <div className="infoBar__item">
          {Utils.formatTime(now)}
        </div>
        <WeatherForecastHeader
          currentObservation={currentObservation}
          reloading={reloading}
          setReloading={setReloading}
          className="infoBar__item"
          />
      </div>
    )
  }
}

InfoBar.propTypes = {
  currentObservation: PropTypes.object,
  reloading: PropTypes.bool,
  setReloading: PropTypes.func,
}
