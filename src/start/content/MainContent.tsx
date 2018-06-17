import * as PropTypes from 'prop-types'
import * as React from 'react'

import CNN from './CNN'
import RandomQuote from './RandomQuote'
import WeatherForecastDay from './WeatherForecastDay'

interface Props {
  className: string
  forecast: any[]
}

const MainContent: React.StatelessComponent<Props> = ({ className, forecast }: Props): JSX.Element => (
  <div className={`mainContent center-align ${className}`}>
    <div className='weatherForecastDays light-blue accent-1 z-depth-1'>
      {forecast.map((forecastDay: any) => (
        <WeatherForecastDay
          key={forecastDay.date.day}
          day={forecastDay} />
      ))}
    </div>
    <div className='mainContent__blocks'>
      <CNN className='mainContent__blocks--cnn' />
      <RandomQuote className='mainContent__blocks--quote' />
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
