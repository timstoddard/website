import React from 'react'
import PropTypes from 'prop-types'

const LoadingPage = ({ error, timedOut, pastDelay }) => {
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
    <div className="loadingPage">
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
