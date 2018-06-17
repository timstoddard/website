import * as React from 'react'

import Board from './Board'
import Video from './Video'

export default class Bingo extends React.Component<{}, {}> {
  videoPlayer: Video

  constructor(props: {}) {
    super(props)
  }

  loadNewVideo = (): void => {
    this.videoPlayer.loadNewVideo()
  }

  render(): JSX.Element {
    document.title = 'Bingo'
    return (
      <div className='bingo center-align row'>
        <h3 className='bingo__title'>Car Crash Bingo</h3>
        <Video
          className='video col s12 m12 l6'
          ref={(ref: Video): void => { this.videoPlayer = ref }} />
        <Board
          className='board col s12 m12 l6'
          onSubmit={this.loadNewVideo} />
      </div>
    )
  }
}
