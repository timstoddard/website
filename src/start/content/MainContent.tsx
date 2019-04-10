import * as PropTypes from 'prop-types'
import * as React from 'react'

import InfoBar from '../InfoBar'
import CNN from './CNN'
import RandomQuote from './RandomQuote'

interface Props {
  className: string
  forecast?: any[]
}

const MainContent: React.StatelessComponent<Props> = ({ className, forecast }: Props): JSX.Element => (
  <div className={`mainContent center-align ${className}`}>
    <CNN className='col s12 m6 mainContent--left' />
    <div className='col s12 m6 mainContent--right'>
      <InfoBar />
      <RandomQuote />
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
