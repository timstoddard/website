import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CNN extends Component {
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
