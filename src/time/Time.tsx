import * as React from 'react'

interface State {
  timeString: string
}

export default class Time extends React.Component<{}, State> {
  updateTimer: number

  constructor(props: {}) {
    super(props)

    this.state = {
      timeString: '',
    }
  }

  componentDidMount(): void {
    this.showTime()
  }

  componentWillUnmount(): void {
    clearTimeout(this.updateTimer)
  }

  showTime = (): void => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    let timeString = `${(hours > 12) ? hours - 12 : (hours > 0 ? hours : 12)}`
    timeString += ':' + `0${minutes}`.slice(-2)
    timeString += ':' + `0${seconds}`.slice(-2)
    timeString += (hours >= 12) ? ' PM' : ' AM'
    this.setState({ timeString })
    const millis = now.getMilliseconds()
    this.updateTimer = setTimeout(
      () => this.showTime(), 1000 - millis < 10 ? 1000 : 1000 - millis) as unknown as number
  }

  render(): JSX.Element {
    document.title = 'Time'
    const { timeString } = this.state

    return (
      <div className='time'>
        {timeString}
      </div>
    )
  }
}
