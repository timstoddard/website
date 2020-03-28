import * as React from 'react'
import Board from './Board'
import Video from './Video'

const styles = require('./scss/Bingo.scss') // tslint:disable-line no-var-requires

export default class Bingo extends React.Component<{}, {}> {
  videoPlayer: React.Ref<Video>

  constructor(props: {}) {
    super(props)
    this.videoPlayer = React.createRef()
  }

  loadNewVideo = (): void => {
    (this.videoPlayer as any).current.loadNewVideo()
  }

  render(): JSX.Element {
    document.title = 'Bingo'
    return (
      <div className={styles.bingo}>
        <h3 className={styles.bingo__title}>
          Car Crash Bingo
        </h3>
        <Video
          ref={this.videoPlayer}
          className={styles.bingo__video} />
        <Board
          className={styles.bingo__board}
          onSubmit={this.loadNewVideo} />
      </div>
    )
  }
}
