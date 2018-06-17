import * as PropTypes from 'prop-types'
import * as React from 'react'

import * as Utils from '../Utils'

interface Props {
  day: any
}

const WeatherForecastDay: React.StatelessComponent<Props> = ({ day }: Props): JSX.Element => (
  <div className='sweatherForecastDay'>
    <img
      src={Utils.secureImg(day.icon)}
      alt={day.icon} />
    <p className='weatherForecastDay__line'>
      {day.date.weekday}
    </p>
    <p className='weatherForecastDay__line'>
      {day.date.month}/{day.date.day}
    </p>
    <p className='weatherForecastDay__line'>
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
