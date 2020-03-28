import classNames from 'classnames'
import * as React from 'react'

const styles = require('./scss/Battery.scss') // tslint:disable-line no-var-requires

interface Nav {
  getBattery: () => BatteryStats
}

const getNav = (): Nav => navigator as unknown as Nav

interface BatteryStats {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  addEventListener: (listener: string, callback: (_: unknown) => void) => void
  removeEventListener: (listener: string, callback: (_: unknown) => void) => void
}

const batteryListeners = [
  'levelchange',
  'chargingchange',
  'chargingtimechange',
  'dischargingtimechange',
]

interface State {
  hasGetBattery: boolean
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  batteryColor: string
  decreasing: boolean
}

export default class Battery extends React.Component<{}, State> {
  batteryAnimationInterval: number
  removeEventListeners: () => void

  constructor(props: {}) {
    super(props)

    this.state = {
      hasGetBattery: !!(navigator && getNav().getBattery),
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 0,
      batteryColor: '',
      decreasing: null,
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      hasGetBattery,
      decreasing,
      level,
    } = this.state

    if (hasGetBattery) {
      const battery: BatteryStats = await getNav().getBattery()
      this.updateStats(battery)

      const onBatteryEvent = (e: Event): void => {
        this.updateStats(e.target as unknown as BatteryStats)
      }

      for (const listener of batteryListeners) {
        battery.addEventListener(listener, onBatteryEvent)
      }

      this.removeEventListeners = (): void => {
        for (const listener of batteryListeners) {
          battery.removeEventListener(listener, onBatteryEvent)
        }
      }
    } else {
      this.updateAnimation({
        level: 1,
        decreasing: true,
      })
      this.batteryAnimationInterval = setInterval(() => {
        if (decreasing && level <= 0) {
          this.updateAnimation({
            level: 0,
            decreasing: false,
          })
        } else if (!decreasing && level >= 1) {
          this.updateAnimation({
            level: 1,
            decreasing: true,
          })
        }
        const delta = 0.002
        const amountToAdd = decreasing ? -delta : delta
        this.updateAnimation({ level: level + amountToAdd })
      }, 4) as unknown as number
    }
  }

  componentWillUnmount(): void {
    clearInterval(this.batteryAnimationInterval)
    this.removeEventListeners()
  }

  updateStats = (battery: BatteryStats): void => {
    this.setState({
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
      level: battery.level,
      batteryColor: this.convertBatteryLevelToColor(battery.level),
    })
  }

  updateAnimation = (options: { level: number, decreasing?: boolean }): void => {
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

  formatTime = (timeInSeconds: number): string => {
    if (timeInSeconds === Infinity || isNaN(timeInSeconds)) {
      return 'n/a'
    }
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = (timeInSeconds % 60)
    const formatNumber = (n: number): string => `0${n}`.slice(-2)
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
  }

  convertBatteryLevelToColor = (level: number): string => {
    if (level > 0.5) {
      return 'green'
    } else if (level > 0.2) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  convertBatteryLevelToPercentage = (level: number): string => {
    return this.state.hasGetBattery
      ? `${Math.round(level * 100)}%`
      : `${level * 100}%`
  }

  render(): JSX.Element {
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
      <div className={styles.battery}>
        <h3 className={styles.battery__title}>
          Battery Stats
        </h3>
        {!hasGetBattery &&
          <h5 className={styles.battery__warning}>
            ERROR: Your browser does not share your battery info.
          </h5>
        }
        <div className={styles.battery__level}>
          <div
            className={classNames(
              styles.battery__level__background,
              styles[`battery__level__background--${batteryColor}`])}
            style={{ width: percentage }} />
          <div className={styles.battery__level__text}>
            {hasGetBattery ? percentage : '??'}
          </div>
        </div>
        {hasGetBattery &&
          <div>
            <div className={styles.battery__info}>
              You are {!charging && 'not'} connected to power.
            </div>
            {chargingTime !== Infinity &&
              <div className={styles.battery__info}>
                Time until full: {formatTime(chargingTime)}
              </div>
            }
            {dischargingTime !== Infinity &&
              <div className={styles.battery__info}>
                Time until dead: {formatTime(dischargingTime)}
              </div>
            }
          </div>
        }
      </div>
    )
  }
}
