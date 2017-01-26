import React from 'react'

import * as Utils from './WeatherUtils'

let LoadingAnimation = React.createClass({
  getInitialState() {
    return { colors: ['blue', 'red', 'yellow', 'green'] }
  },
  render() {
    return (
      <div className="loading__icon preloader-wrapper small active">
        {this.state.colors.map((color) => (
          <div
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
          </div>
        ))}
      </div>
    )
  }
})

let WeatherForecastHeader = React.createClass({
  propTypes: {
    'currentObservation': React.PropTypes.object,
    'reloading': React.PropTypes.bool,
    'setReloading': React.PropTypes.func
  },
  reloadWeatherData() {
    Utils.reloadWeatherData()
    this.props.setReloading(true)
  },
  render() {
    let currentObservation = this.props.currentObservation
    if (!currentObservation) {
      return (
        <div>
          <div className="weatherForecastHeader__loading">
            Loading weather...
          </div>
          <LoadingAnimation />
        </div>
      )
    }
    let degree = String.fromCharCode(176)
    return (
      <div>
        <div className="weatherForecastHeader__iconWrapper">
          <img src={Utils.secureImg(currentObservation.icon)} />
        </div>
        <div className="weatherForecastHeader__city">
          {`${currentObservation.display_location.city}: ${currentObservation.temp_f}${degree}F`}
          {Math.abs(currentObservation.temp_f - currentObservation.feelslike_f) > 2
            ? (
              <span className="weatherForecastHeader__feelsLike">
                {` (Feels like ${currentObservation.feelslike_f}${degree}F)`}
              </span>
            )
            : ''}
        </div>
        {this.props.reloading
          ? <LoadingAnimation />
          : (
            <div className="weatherForecastHeader__iconWrapper">
              <img
                src="../../media/icons/reload.svg"
                onClick={this.reloadWeatherData}
                className="weatherForecastHeader__icon--reload" />
            </div>
          )}
      </div>
    )
  }
})

let WeatherForecastDay = React.createClass({
  propTypes: {
    'day': React.PropTypes.object,
  },
  render() {
    let day = this.props.day
    if (!day) {
      return <div />
    }
    return (
      <div className="weatherForecastDay col s6 m4 l2">
        <div className="icon__wrapper">
          <img src={Utils.secureImg(day.icon)} />
        </div>
        <div className="card-content">
          <p className="card-content__line">
            {day.date.weekday}
          </p>
          <p className="card-content__line">
            {day.date.month}/{day.date.day}
          </p>
          <p className="card-content__line">
            {day.low.fahrenheit}-{day.high.fahrenheit}&deg;F
            </p>
        </div>
      </div>
    )
  }
})

let WeatherForecast = React.createClass({
  getInitialState() {
    return { currentObservation: null, forecast: [], reloading: false }
  },
  componentDidMount() {
    let success = function(response) {
      this.setState({
        currentObservation: response.current_observation,
        forecast: response.forecast.simpleforecast.forecastday,
        reloading: false
      })
      Utils.set('weatherData', response)
      Utils.set('weatherDataTimestamp', Date.now())
    }.bind(this)
    Utils.showWeather(success)
  },
  componentWillUnmount() {
    Utils.cancelReloadWeatherTimer()
  },
  setReloading(value) {
    this.setState({ reloading: value })
  },
  render() {
    let weatherForecastDays = []
    for (let i = 0; i < 6; i++) {
      weatherForecastDays.push(<WeatherForecastDay key={i} day={this.state.forecast[i]} />)
    }
    return <div className="row light-blue accent-2">
      <div className="weatherForecastHeader card-panel">
        <WeatherForecastHeader
          currentObservation={this.state.currentObservation}
          reloading={this.state.reloading}
          setReloading={this.setReloading} />
      </div>
      <div className="weatherForecastDays">
        {weatherForecastDays}
      </div>
    </div>
  }
})

let RandomQuote = React.createClass({
  getInitialState() {
    return { quote: '', author: '' }
  },
  componentDidMount() {
    $.ajax({
      url: 'https://www.reddit.com/r/quotes/top.json?sort=top&t=month',
      type: 'GET',
      success: function(response) {
        let children = response.data.children
        let index = Math.floor(Math.random() * children.length)
        let rawQuote = children[index].data.title
          .replace(/[“”"]/g, '') // remove quotation marks
          .replace(/\[\d+x\d+\]/g, '') // remove image data
          .replace(/\s+/g, ' ') // normalize spaces
          .trim()
        let separators = ['-', '~', '-', '–', '—', '―']
        for (let i = 0; i < separators.length; i++) {
          let separator = separators[i]
          if (new RegExp(separator).test(rawQuote)) {
            let parts = rawQuote.split(separator)
            this.setState({ quote: parts[0].trim(), author: parts[1].trim() })
            break
          }
        }
        if (this.state.quote === '' && this.state.quote === '') {
          let quoteEndIndex = rawQuote.lastIndexOf('.') + 1
          let quote = rawQuote.substring(0, quoteEndIndex).trim()
          let author = rawQuote.substring(quoteEndIndex, rawQuote.length).trim() || 'Anonymous'
          this.setState({ quote: quote, author: author })
        }
      }.bind(this),
      error: function(error) {
        /* eslint-disable no-console */
        console.error(error)
        /* eslint-enable no-console */
      },
      timeout: 10000
    })
  },
  render() {
    return (
      <div className="quote center-align blue-grey lighten-3">
        <p className="quote__text">
          {this.state.quote}
        </p>
        <p className="quote__text grey-text text-darken-1">
          <em>--{this.state.author}</em>
        </p>
      </div>
    )
  }
})

export default React.createClass({
  propTypes: {
    'className': React.PropTypes.string
  },
  render() {
    return (
      <div className={`mainContent center-align ${this.props.className}`}>
        <WeatherForecast />
        <RandomQuote />
      </div>
    )
  }
})
