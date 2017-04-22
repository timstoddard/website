import React, { Component } from 'react'

import ColorChanger from './ColorChanger'
import StrobeOptions from './StrobeOptions'

import './Strobe.scss'

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
    this.colorChanger = new ColorChanger()
    this.moveInterval = setInterval(this.updateStrobe, this.state.ms)
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval)
  }

  updateStrobe() {
    this.setState({ background: this.colorChanger.nextColor() })
  }

  updateMs(newMs) {
    this.setState({ ms: newMs })
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
    if (showOptions) {
      this.setState({ showOptions: true })
    }
    if (!this.state.paused) {
      clearInterval(this.moveInterval)
      if (this.state.background === 'rgb(0,0,0)') {
        this.updateStrobe()
      }
    } else {
      this.moveInterval = setInterval(this.updateStrobe, this.state.ms)
    }
    this.setState({ paused: !this.state.paused })
  }

  render() {
    document.title = 'Strobe'
    return (
      <div
        className="strobe--regular"
        style={{ background: this.state.background }}>
        {!this.state.showOptions &&
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
          </div>}
        {this.state.showOptions && <StrobeOptions
          ms={this.state.ms}
          updateMs={this.updateMs}
          hideOptions={this.hideOptions}
          />}
      </div>
    )
  }
}
