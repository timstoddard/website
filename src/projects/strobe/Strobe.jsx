import React, { Component } from 'react'

import ColorChanger from './ColorChanger'
import StrobeOptions from './StrobeOptions'

export default class Strobe extends Component {
  constructor() {
    super()

    this.colorChanger = null
    this.moveInterval = null

    this.updateStrobe = this.updateStrobe.bind(this)
    this.updateMs = this.updateMs.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.hideOptions = this.hideOptions.bind(this)
    this.togglePause = this.togglePause.bind(this)

    this.state = {
      background: 'black',
      ms: 45,
      paused: false,
      showOptions: false,
    }
  }

  componentDidMount() {
    const { ms } = this.state
    this.colorChanger = new ColorChanger()
    this.moveInterval = setInterval(this.updateStrobe, ms)
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval)
  }

  updateStrobe() {
    this.setState({ background: this.colorChanger.nextColor() })
  }

  updateMs(ms) {
    this.setState({ ms })
  }

  showOptions() {
    this.setState({ showOptions: true })
    if (!this.state.paused) {
      this.togglePause(true)
    }
  }

  hideOptions() {
    this.setState({ showOptions: false })
    if (this.state.paused) {
      this.togglePause(false)
    }
  }

  togglePause(showOptions) {
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
      this.moveInterval = setInterval(this.updateStrobe, ms)
    }
    this.setState({ paused: !paused })
  }

  render() {
    document.title = 'Strobe'
    const { background, showOptions, ms } = this.state
    return (
      <div
        className="strobe--regular"
        style={{ background }}>
        {!showOptions &&
          <div className="strobe__buttons">
            <a
              onClick={() => this.togglePause(false)}
              className="strobe__button">
              Pause
            </a>
            <a
              onClick={this.showOptions}
              className="strobe__button">
              Options
            </a>
          </div>
        }
        {showOptions &&
          <StrobeOptions
            ms={ms}
            updateMs={this.updateMs}
            hideOptions={this.hideOptions}
            />
          }
      </div>
    )
  }
}
