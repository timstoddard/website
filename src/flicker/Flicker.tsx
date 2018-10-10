import * as React from 'react'

interface State {
  currentHeight: number
  currentMax: number
  increasing: boolean
}

const MIN_FLAME_HEIGHT = 30

export default class Flicker extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      currentHeight: 0,
      currentMax: 1,
      increasing: true,
    }
  }

  componentDidMount(): void {
    this.run()
  }

  run = (): void => {
    const { currentHeight, currentMax, increasing } = this.state
    const delta = Math.random() * 100 + 20
    let newHeight
    const setStateVars: any = {}
    if (increasing) {
      newHeight = currentHeight + delta
      if (newHeight > currentMax) {
        newHeight = currentMax
        setStateVars.increasing = false
      }
    } else {
      newHeight = currentHeight - delta
      if (newHeight < 0) {
        newHeight = MIN_FLAME_HEIGHT
        setStateVars.increasing = true
        setStateVars.currentMax = this.getNewMax()
      }
    }
    setStateVars.currentHeight = newHeight
    this.setState(setStateVars, () => {
      setTimeout(() => {
        this.run()
      }, Math.random() * 15 + 10)
    })
  }

  getNewMax = (): number => {
    const maxHeight = 80
    return Math.random() > 0.8
      ? Math.random() * (maxHeight * 0.3) + (maxHeight * 0.7)
      : Math.random() * (maxHeight * 0.3) + (maxHeight * 0.2)
  }

  render(): JSX.Element {
    document.title = 'Flicker'

    const { currentHeight, currentMax } = this.state
    const orange = `rgb(244,${Math.floor(Math.random() * 40 + 120)},66)`
    const yellow = 'rgb(255,220,0)'
    const topBorderRadius = `${Math.min(currentHeight / 2, 12)}px`

    return (
      <div className='flicker'>
        <div className='flicker__candle'>
          <div className='flicker__base' />
          <div
            className='flicker__fire flicker__fire--orange'
            style={{
              background: orange,
              borderTopLeftRadius: topBorderRadius,
              borderTopRightRadius: topBorderRadius,
              boxShadow: `0px 0px 20px 10px ${orange}`,
              height: currentHeight,
              opacity: currentHeight / currentMax,
            }} />
          <div
            className='flicker__fire flicker__fire--yellow'
            style={{
              background: yellow,
              borderTopLeftRadius: topBorderRadius,
              borderTopRightRadius: topBorderRadius,
              boxShadow: `0px 0px 15px 10px ${yellow}`,
              height: currentHeight * 3 / 5,
              opacity: currentHeight / currentMax * 0.8,
            }} />
        </div>
      </div>
    )
  }
}