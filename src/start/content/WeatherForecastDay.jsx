import React from 'react'
import PropTypes from 'prop-types'

import * as Utils from '../Utils'

const WeatherForecastDay = ({ day }) => (
  <div className="weatherForecastDay">
    <img
      src={Utils.secureImg(day.icon)}
      alt={day.icon} />
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

export default WeatherForecastDay
