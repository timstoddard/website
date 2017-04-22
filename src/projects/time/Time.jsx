import React, { Component } from 'react'

import './Time.scss'

export default class Time extends Component {
  constructor() {
    super()

    this.updateTimer = null
    
    this.state = { timeStr: '' }
  }

  componentDidMount() {
    this.showTime()
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimer)
  }

  showTime() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    let timeStr = '' + ((hours > 12) ? hours - 12 : (hours > 0 ? hours : 12))
    timeStr += ((minutes < 10) ? ':0' : ':') + minutes
    timeStr += ((seconds < 10) ? ':0' : ':') + seconds
    timeStr += (hours >= 12) ? ' PM' : ' AM'
    this.setState({ timeStr: timeStr })
    const millis = now.getMilliseconds()
    this.updateTimer = setTimeout(() => this.showTime(), 1000 - millis < 10 ? 1000 : 1000 - millis)
  }

  render() {
    document.title = 'Time'
    return (
      <div className="time">
        {this.state.timeStr}
      </div>
    )
  }
}
