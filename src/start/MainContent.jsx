import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Utils from './Utils'

const WeatherForecastDay = ({ day }) => (
  <div className="weatherForecastDay">
    <img
      src={Utils.secureImg(day.icon)}
      alt={day.icon}
      />
    <p className="weatherForecastDay__line">
      {day.date.weekday}
    </p>
    <p className="weatherForecastDay__line">
      {day.date.month}/{day.date.day}
    </p>
    <p className="weatherForecastDay__line">
      {day.low.fahrenheit}-{day.high.fahrenheit}&deg;F
    </p>
  </div>
)

WeatherForecastDay.propTypes = {
  day: PropTypes.shape({
    icon: PropTypes.string,
    date: PropTypes.shape({
      weekday: PropTypes.string,
      month: PropTypes.number,
      day: PropTypes.number,
    }),
    low: PropTypes.shape({ fahrenheit: PropTypes.string }),
    high: PropTypes.shape({ fahrenheit: PropTypes.string }),
  }).isRequired,
}

class CNN extends Component {
  constructor(props) {
    super(props)

    this.state = { data: [] }
  }

  componentDidMount() {
    $.ajax({
      url: '/cnn-rss-feed',
      type: 'GET',
      success: function(response) {
        const data = JSON.parse(response)
        this.setState({ data: data.items })
      }.bind(this),
      error(error) {
        /* eslint-disable no-console */
        console.error(error)
        /* eslint-enable no-console */
      },
      timeout: 10000,
    })
  }

  render() {
    const { className } = this.props
    const { data } = this.state
    return (
      <div className={`blue-grey lighten-3 z-depth-1 ${className}`}>
        {data.map(({ link, origLink, title, description }) => (
          <a
            key={link}
            href={origLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rssItem">
            <div className="rssItem__title">
              {title}
            </div>
            <div className="rssItem__description">
              {description}
            </div>
          </a>
        ))}
      </div>
    )
  }
}

CNN.propTypes = {
  className: PropTypes.string.isRequired,
}

class RandomQuote extends Component {
  constructor(props) {
    super(props)

    this.state = { quote: '' }
  }

  componentDidMount() {
    $.ajax({
      url: 'https://www.reddit.com/r/quotes/top.json?sort=top&t=month',
      type: 'GET',
      success: function(response) {
        const { children } = response.data
        const index = Math.floor(Math.random() * children.length)
        const quote = children[index].data.title
          .replace(/[“”"]/g, '') // remove quotation marks
          .replace(/\[\d+x\d+\]/g, '') // remove image data
          .replace(/\s+/g, ' ') // normalize spaces
          .trim()
        this.setState({ quote })
      }.bind(this),
      error(error) {
        /* eslint-disable no-console */
        console.error(error)
        /* eslint-enable no-console */
      },
      timeout: 10000,
    })
  }

  render() {
    const { className } = this.props
    const { quote } = this.state
    return (
      <div className={`center-align blue-grey lighten-3 z-depth-1 ${className}`}>
        <div>{quote}</div>
      </div>
    )
  }
}

RandomQuote.propTypes = {
  className: PropTypes.string.isRequired,
}

const MainContent = ({ className, forecast }) => (
  <div className={`mainContent center-align ${className}`}>
    <div className="weatherForecastDays light-blue accent-1 z-depth-1">
      {forecast.map(forecastDay => (
        <WeatherForecastDay
          key={forecastDay.date.day}
          day={forecastDay}
          />
      ))}
    </div>
    <div className="mainContent__blocks">
      <CNN className="mainContent__blocks--cnn" />
      <RandomQuote className="mainContent__blocks--quote" />
    </div>
  </div>
)

MainContent.propTypes = {
  className: PropTypes.string.isRequired,
  forecast: PropTypes.arrayOf(PropTypes.object),
}

MainContent.defaultProps = {
  forecast: [],
}

export default MainContent
