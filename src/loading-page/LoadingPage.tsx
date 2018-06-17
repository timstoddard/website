import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  error: boolean
  timedOut: boolean
  pastDelay: boolean
}

const LoadingPage: React.StatelessComponent<Props> = ({ error, timedOut, pastDelay }: Props): JSX.Element => {
  let loadingText
  if (error) {
    loadingText = 'Error!'
  } else if (timedOut) {
    loadingText = 'Taking a long time...'
  } else if (pastDelay) {
    loadingText = 'Loading...'
  } else {
    return null
  }
  return (
    <div className='loadingPage'>
      {loadingText}
    </div>
  )
}

LoadingPage.propTypes = {
  error: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
}

LoadingPage.defaultProps = {
  error: false,
  timedOut: false,
  pastDelay: false,
}

export default LoadingPage
