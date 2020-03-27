import * as React from 'react'
import Board from './Board'
import Video from './Video'

const styles = require('./scss/Bingo.scss') // tslint:disable-line no-var-requires

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
      <div className={styles.bingo}>
        <h3 className={styles.bingo__title}>
          Car Crash Bingo
        </h3>
        <Video
          className={styles.bingo__video}
          ref={(ref: Video): void => { this.videoPlayer = ref }} />
        <Board
          className={styles.bingo__board}
          onSubmit={this.loadNewVideo} />
      </div>
    )
  }
}
