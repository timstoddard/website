import * as React from 'react'

import ColorChanger from './ColorChanger'
import StrobeOptions from './StrobeOptions'

interface State {
  background: string
  ms: number
  paused: boolean
  showOptions: boolean
}

export default class Strobe extends React.Component<{}, State> {
  colorChanger: ColorChanger
  moveInterval: number

  constructor(props: {}) {
    super(props)

    this.state = {
      background: 'black',
      ms: 45,
      paused: false,
      showOptions: false,
    }
  }

  componentDidMount(): void {
    const { ms } = this.state
    this.colorChanger = new ColorChanger()
    this.moveInterval = setInterval(this.updateStrobe, ms) as unknown as number
  }

  componentWillUnmount(): void {
    clearInterval(this.moveInterval)
  }

  updateStrobe = (): void => {
    this.setState({ background: this.colorChanger.nextColor() })
  }

  updateMs = (ms: number): void => {
    this.setState({ ms }, () => {
      clearInterval(this.moveInterval)
      this.moveInterval = setInterval(this.updateStrobe, ms) as unknown as number
    })
  }

  showOptions = (): void => {
    this.setState({ showOptions: true })
    if (!this.state.paused) {
      this.togglePause(true)
    }
  }

  hideOptions = (): void => {
    this.setState({ showOptions: false })
    if (this.state.paused) {
      this.togglePause(false)
    }
  }

  togglePause = (showOptions: boolean): (() => void) => {
    return (): void => {
      const { paused, background, ms } = this.state
      if (showOptions) {
        this.setState({ showOptions: true })
      }
      if (!paused) {
        clearInterval(this.moveInterval)
        if (background === 'rgb(0,0,0)') {
          this.updateStrobe()
        }
      } else {
        this.moveInterval = setInterval(this.updateStrobe, ms) as unknown as number
      }
      this.setState({ paused: !paused })
    }
  }

  render(): JSX.Element {
    document.title = 'Strobe'
    const { togglePause } = this
    const { background, showOptions, ms } = this.state

    return (
      <div
        className='strobe'
        style={{ background }}>
        {!showOptions &&
          <div className='strobe__buttons'>
            <a
              onClick={togglePause(false)}
              className='strobe__button'>
              Pause
            </a>
            <a
              onClick={this.showOptions}
              className='strobe__button'>
              Options
            </a>
          </div>
        }
        {showOptions &&
          <StrobeOptions
            ms={ms}
            updateMs={this.updateMs}
            hideOptions={this.hideOptions} />
        }
      </div>
    )
  }
}
