import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RandomQuote extends Component {
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
