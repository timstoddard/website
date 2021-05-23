import * as React from 'react'
import ColorChanger from './ColorChanger'
import Mover from './Mover'
import { EmptyObject } from '../types'
import styles from './scss/Zen.scss'

interface State {
  screenCenterX: number
  screenCenterY: number
  minRadius: number
  maxRadius: number
}

export default class Zen extends React.Component<EmptyObject, State> {
  colorChanger1: ColorChanger
  colorChanger2: ColorChanger
  moveInterval: number
  private mover1: React.RefObject<Mover> = React.createRef()
  private mover2: React.RefObject<Mover> = React.createRef()

  constructor(props: EmptyObject) {
    super(props)

    this.colorChanger1 = new ColorChanger()
    this.colorChanger2 = new ColorChanger()
    this.colorChanger2.setRGB(0, 255, 255, false, 'g')
    this.moveInterval = setInterval(this.updateBlock, 5) as unknown as number

    this.state = {
      screenCenterX: 0,
      screenCenterY: 0,
      minRadius: 0,
      maxRadius: 0,
    }
  }

  componentDidMount(): void {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount(): void {
    clearInterval(this.moveInterval)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = (): void => {
    const { innerWidth, innerHeight } = window
    const { minRadius } = this.state
    this.setState({
      screenCenterX: innerWidth / 2,
      screenCenterY: innerHeight / 2,
      minRadius,
      maxRadius: (Math.min(innerWidth, innerHeight) * 2 / 5),
    })
  }

  updateBlock = (): void => {
    const nextColor1 = this.colorChanger1.nextColor()
    const nextColor2 = this.colorChanger2.nextColor()
    this.mover1.current.move(nextColor1)
    this.mover2.current.move(nextColor2)
  }

  render(): JSX.Element {
    document.title = 'Zen Mode'
    const {
      screenCenterX,
      screenCenterY,
      maxRadius,
    } = this.state

    return (
      <div className={styles.zen}>
        <Mover
          ref={this.mover1}
          direction={1}
          offset={0}
          centerX={screenCenterX}
          centerY={screenCenterY}
          minRadius={60}
          maxRadius={maxRadius}
          radiusChangeSpeed={0.2} />
        <Mover
          ref={this.mover2}
          direction={-1}
          offset={Math.PI / 2}
          centerX={screenCenterX}
          centerY={screenCenterY}
          minRadius={60}
          maxRadius={maxRadius}
          radiusChangeSpeed={0.4} />
      </div>
    )
  }
}
