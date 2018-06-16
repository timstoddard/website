import React, { Component } from 'react'

export default class Battery extends Component {
  constructor(props) {
    super(props)

    this.updateStats = this.updateStats.bind(this)
    this.formatTime = this.formatTime.bind(this)

    this.state = {
      hasGetBattery: navigator && navigator.getBattery,
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 0,
      batteryColor: '',
      decreasing: null,
    }
  }

  componentDidMount() {
    if (this.state.hasGetBattery) {
      navigator.getBattery().then(battery => {
        this.updateStats(battery)

        const listeners = [
          'levelchange',
          'chargingchange',
          'chargingtimechange',
          'dischargingtimechange',
        ]
        listeners.forEach(listener => {
          battery.addEventListener(listener, () => {
            this.updateStats(battery)
          })
        })
      })
    } else {
      this.updateAnimation({
        level: 1,
        decreasing: true,
      })
      this.batteryAnimationInterval = setInterval(() => {
        if (this.state.decreasing && this.state.level <= 0) {
          this.updateAnimation({
            level: 0,
            decreasing: false,
          })
        } else if (!this.state.decreasing && this.state.level >= 1) {
          this.updateAnimation({
            level: 1,
            decreasing: true,
          })
        }
        const delta = 0.002
        const amountToAdd = this.state.decreasing ? -delta : delta
        this.updateAnimation({ level: this.state.level + amountToAdd })
      }, 4)
    }
  }

  componentWillUnmount() {
    clearInterval(this.batteryAnimationInterval)
  }

  updateStats(battery) {
    this.setState({
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
      level: battery.level,
      batteryColor: this.convertBatteryLevelToColor(battery.level),
    })
  }

  updateAnimation(options) {
    if (options.decreasing === undefined) {
      this.setState({
        level: options.level,
        batteryColor: this.convertBatteryLevelToColor(options.level),
      })
    } else {
      this.setState({
        level: options.level,
        batteryColor: this.convertBatteryLevelToColor(options.level),
        decreasing: options.decreasing,
      })
    }
  }

  formatTime(timeInSeconds) {
    if (timeInSeconds === Infinity || isNaN(timeInSeconds)) {
      return 'n/a'
    }
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = (timeInSeconds % 60)
    const formatNumber = (number) => `0${number}`.slice(-2)
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
  }

  convertBatteryLevelToColor(level) {
    if (level > 0.5) {
      return 'green'
    } else if (level > 0.2) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  convertBatteryLevelToPercentage(level) {
    return this.state.hasGetBattery
      ? `${Math.round(level * 100)}%`
      : `${level * 100}%`
  }

  render() {
    document.title = 'Battery Status'

    const { formatTime } = this
    const {
      hasGetBattery,
      charging,
      chargingTime,
      dischargingTime,
      level,
      batteryColor,
    } = this.state
    const percentage = this.convertBatteryLevelToPercentage(level)

    return (
      <div className="battery">
        <h3>Battery Stats</h3>
        {!hasGetBattery &&
          <h5 className="battery__warning">
            ERROR: Your browser does not share your battery info.
          </h5>
        }
        <div className="battery__level">
          <div
            className={`battery__level__background battery__level__background--${batteryColor}`}
            style={{ width: percentage }} />
          <div className="battery__level__text">
            {hasGetBattery ? percentage : '??'}
          </div>
        </div>
        {hasGetBattery &&
          <div>
            <div className="battery__info">
              You are {!charging && 'not'} connected to power.
            </div>
            {chargingTime !== Infinity &&
              <div className="battery__info">
                Time until full: {formatTime(chargingTime)}
              </div>
            }
            {dischargingTime !== Infinity &&
              <div className="battery__info">
                Time until dead: {formatTime(dischargingTime)}
              </div>
            }
          </div>
        }
      </div>
    )
  }
}
