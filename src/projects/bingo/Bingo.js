import React, { Component } from 'react'

import Board from './Board'
import Video from './Video'

import './Bingo.scss'

class Bingo extends Component {
  constructor() {
    super()
    this.loadNewVideo = this.loadNewVideo.bind(this)
  }

  loadNewVideo() {
    this.videoPlayer.loadNewVideo()
  }

  render() {
    document.title = 'Bingo'
    return <div className="bingo center-align row">
      <h3 className="bingo__title">Car Crash Bingo</h3>
      <Video
        className="video col s12 m12 l6"
        ref={(ref) => this.videoPlayer = ref} />
      <Board
        className="board col s12 m12 l6"
        onSubmit={this.loadNewVideo} />
    </div>
  }
}

export default Bingo
