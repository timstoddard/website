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
      <div className='bingo'>
        <h3 className='bingo__title'>Car Crash Bingo</h3>
        <Video
          className='bingo__video'
          ref={(ref: Video): void => { this.videoPlayer = ref }} />
        <Board
          className='bingo__board'
          onSubmit={this.loadNewVideo} />
      </div>
    )
  }
}
