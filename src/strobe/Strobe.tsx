import * as React from 'react'
import Button from 'react-bootstrap/Button'
import ColorChanger from './ColorChanger'
import StrobeOptions from './StrobeOptions'
import styles from './scss/Strobe.scss'

interface State {
  background: string
  ms: number
  paused: boolean
  showingOptions: boolean
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
      showingOptions: false,
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
    this.setState({ ms })
  }

  showOptions = (): void => {
    this.setState({ showingOptions: true })
    this.setStrobeOn(false)
  }

  hideOptions = (): void => {
    this.setState({ showingOptions: false })
    this.setStrobeOn(true)
  }

  togglePause = (): void => {
    const { paused } = this.state
    this.setStrobeOn(paused)
  }

  render(): JSX.Element {
    document.title = 'Strobe'
    const {
      showOptions,
      updateMs,
      hideOptions,
      togglePause,
    } = this
    const {
      paused,
      background,
      showingOptions,
      ms,
    } = this.state

    return (
      <div
        className={styles.strobe}
        style={{ background }}>
        {!showingOptions &&
          <div className={styles.strobe__buttons}>
            <Button
              onClick={togglePause}
              className={styles.strobe__button}>
              { paused ? 'Play' : 'Pause' }
            </Button>
            <Button
              onClick={showOptions}
              className={styles.strobe__button}>
              Options
            </Button>
          </div>
        }
        {showingOptions &&
          <StrobeOptions
            ms={ms}
            updateMs={updateMs}
            hideOptions={hideOptions} />
        }
      </div>
    )
  }

  private setStrobeOn = (shouldTurnOn: boolean): void => {
    const {
      paused,
      background,
      ms,
    } = this.state

    // paused and should turn on   -> start
    // paused and should turn off  -> do nothing
    // playing and should turn on  -> do nothing
    // playing and should turn off -> stop
    if (paused && shouldTurnOn) {
      this.moveInterval = setInterval(this.updateStrobe, ms) as unknown as number
    } else if (!paused && !shouldTurnOn) {
      clearInterval(this.moveInterval)
      if (background === 'rgb(0,0,0)') {
        this.updateStrobe()
      }
    }
    this.setState({ paused: !shouldTurnOn })
  }
}
