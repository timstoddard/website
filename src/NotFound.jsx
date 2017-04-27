import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './NotFound.scss'

const NotFound = ({ destination, to }) => {
  document.title = 'Page Not Found'
  return (
    <div className="notFound">
      <h1>The page you&apos;re looking for does not exist.</h1>
      <h1>
        <Link
          className="notFound__link"
          to={to}>
          Click here to go to {destination}.
        </Link>
      </h1>
      <img
        src="https://http.cat/404"
        alt="Page Not Found"
        />
    </div>
  )
}

NotFound.propTypes = {
  destination: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default NotFound
