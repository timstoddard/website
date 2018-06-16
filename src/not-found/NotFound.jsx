import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NotFound = ({ destination, to }) => {
  document.title = 'Page Not Found'
  return (
    <div className="notFound">
      <h4>The page you&rsquo;re looking for does not exist.</h4>
      <h4>
        <Link
          className="notFound__link"
          to={to}>
          Click here to go to {destination}.
        </Link>
      </h4>
      <img
        src="https://http.cat/404"
        alt="Page Not Found" />
    </div>
  )
}

NotFound.propTypes = {
  destination: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default NotFound
