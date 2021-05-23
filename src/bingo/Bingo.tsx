import * as React from 'react'
import Board from './Board'
import Video from './Video'
import { EmptyObject } from '../types'
import styles from './scss/Bingo.scss'

export default class Bingo extends React.Component<EmptyObject, EmptyObject> {
  private videoPlayer: React.RefObject<Video> = React.createRef()

  constructor(props: EmptyObject) {
    super(props)
  }

  loadNewVideo = (): void => {
    this.videoPlayer.current.loadNewVideo()
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
