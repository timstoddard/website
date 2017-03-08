import React from 'react'

let WelcomeText = React.createClass({
  propTypes: {
    'className': React.PropTypes.node,
    'now': React.PropTypes.instanceOf(Date)
  },
  componentDidMount() {
    let url = window.location.href // TODO: does react router have something for this?
    let index = url.indexOf('?')
    if (index === -1) return

    let name = url.substring(index + 1).trim()
    if (name.length == 0) return

    try {
      name = decodeURIComponent(name)
      this.setState({ name: name })
      localStorage.setItem('name', name)
    }
    /* eslint-disable no-empty */
    catch (e) { }
    /* eslint-enable no-empty */
  },
  formatTimeOfDay() {
    let hours = this.props.now.getHours()
    if (hours < 12) {
      return 'Morning'
    } else if (hours < 18) {
      return 'Afternoon'
    } else if (hours < 21) {
      return 'Evening'
    }
    return 'Night'
  },
  render() {
    return (
      <div className={this.props.className}>
        {`Good ${this.formatTimeOfDay()}, ${localStorage.getItem('name') || ''}!`}
      </div>
    )
  }
})

let DateText = React.createClass({
  propTypes: {
    'className': React.PropTypes.node,
    'now': React.PropTypes.instanceOf(Date)
  },
  formatDay() {
    let dayOfWeek = this.props.now.getDay()
    let month = this.props.now.getMonth()
    let day = this.props.now.getDate()
    return `${this.dayString(dayOfWeek)} ${this.monthString(month)} ${day}, ${this.props.now.getFullYear()}`
  },
  dayString(day) {
    return 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'.split('|')[day]
  },
  monthString(month) {
    return 'January|February|March|April|May|June|July|August|September|October|November|December'.split('|')[month]
  },
  render() {
    return (
      <div className={this.props.className}>
        {this.formatDay()}
      </div>
    )
  }
})

let TimeText = React.createClass({
  propTypes: {
    'className': React.PropTypes.node,
    'now': React.PropTypes.instanceOf(Date)
  },
  formatTime() {
    let hours = this.props.now.getHours()
    let h = hours > 12 ? hours - 12 : (hours > 0 ? hours : 12)
    let minutes = this.props.now.getMinutes()
    let m = `${minutes < 10 ? '0' : ''}${minutes}`
    let seconds = this.props.now.getSeconds()
    let s = `${seconds < 10 ? '0' : ''}${seconds}`
    let ampm = `${hours >= 12 ? 'PM' : 'AM'}`
    return `${h}:${m}:${s} ${ampm}`
  },
  render() {
    return (
      <div className={this.props.className}>
        {this.formatTime()}
      </div>
    )
  }
})

export default React.createClass({
  getInitialState() {
    return { now: new Date() }
  },
  componentDidMount() {
    this.updateTime()
  },
  componentWillUnmount() {
    this.clearTimeout()
  },
  updateTime() {
    let now = new Date()
    this.setState({ now: now })
    let millis = now.getMilliseconds()
    this.nowTimer = setTimeout(this.updateTime, 1000 - millis)
  },
  clearTimeout() {
    clearTimeout(this.nowTimer)
  },
  render() {
    return <div className="infoBar center-align row cyan accent-3 black-text">
      <div className="infoBar__text infoBar__text--start col s12 m12 l2">
        start
      </div>
      <WelcomeText
        now={this.state.now}
        className="infoBar__text col s12 m12 l3" />
      <DateText
        now={this.state.now}
        className="infoBar__text col s12 m12 l4" />
      <TimeText
        now={this.state.now}
        className="infoBar__text col s12 m12 l3" />
    </div>
  }
})