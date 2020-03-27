import * as React from 'react'
import * as Utils from './Utils'

const styles = require('./scss/InfoBar.scss') // tslint:disable-line no-var-requires

interface Props {
  className: string
}

interface State {
  now: Date
  name: string
  isRainbowMode: boolean
}

export default class InfoBar extends React.Component<Props, State> {
  nowTimer: number

  constructor(props: Props) {
    super(props)

    this.state = {
      now: new Date(),
      name: localStorage.getItem('name') || '',
      isRainbowMode: true,
    }
  }

  componentDidMount(): void {
    this.checkForSavedName()
    this.updateTime()

    // add window key listener
    window.addEventListener('keydown', this.toggleRainbowMode)
  }

  componentWillUnmount(): void {
    clearTimeout(this.nowTimer)

    // remove window key listener
    window.removeEventListener('keydown', this.toggleRainbowMode)
  }

  checkForSavedName = (): void => {
    const url = window.location.href
    const index = url.indexOf('?')
    if (index === -1) {
      return
    }

    let name = url.substring(index + 1).trim()
    if (name.length === 0) {
      return
    }

    try {
      name = decodeURIComponent(name)
      this.setState({ name })
      localStorage.setItem('name', name)
    } catch (e) {
      alert('Name was not saved. ' + e)
    }
  }

  updateTime = (): void => {
    const now = new Date()
    this.setState({ now })
    const millis = now.getMilliseconds()
    this.nowTimer = setTimeout(this.updateTime, 1000 - millis) as unknown as number
  }

  toggleRainbowMode = (e: KeyboardEvent): void => {
    if (e.key === 'g') {
      this.setState({ isRainbowMode: !this.state.isRainbowMode })
    }
  }

  render(): JSX.Element {
    const { className } = this.props
    const {
      now,
      name,
      isRainbowMode,
    } = this.state

    return (
      <div className={`${styles.infoBar} ${className}`}>
        <div className={`${styles.infoBar__item} ${isRainbowMode ? styles['infoBar__item--rainbow'] : ''}`}>
          {Utils.createWelcomeMessage(now, name)}
        </div>
        <div className={styles.infoBar__item}>
          {Utils.createDateString(now)}
        </div>
        <div className={styles.infoBar__item}>
          {Utils.formatTime(now)}
        </div>
      </div>
    )
  }
}
