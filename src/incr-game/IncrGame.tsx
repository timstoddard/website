import * as React from 'react'

const moneyFormat = (n: number): string => n.toFixed(2)
const moneyAmount = (n: number): number => parseFloat(moneyFormat(n))

interface State {
  money: number
  moneyAdder: number
  moneyAdderLevel: number
  moneyAdderCost: number
  timer: number
  timerLevel: number
  timerCost: number
}

export default class IncrGame extends React.Component<{}, State> {
  runTimeout: number
  hoverMoneyTimeout: number

  constructor(props: {}) {
    super(props)

    this.state = {
      money: 10,
      moneyAdder: 1,
      moneyAdderLevel: 1,
      moneyAdderCost: 10,
      timer: 1000,
      timerLevel: 1,
      timerCost: 10,
    }
  }

  componentWillMount(): void {
    this.run()
  }

  componentWillUnmount(): void {
    window.clearTimeout(this.runTimeout)
    window.clearTimeout(this.hoverMoneyTimeout)
  }

  getMoneyAdder = (moneyAdderLevel: number): number => {
    return Math.pow(1.2, moneyAdderLevel)
  }

  getTimer = (timerLevel: number): number => {
    return Math.pow(0.9, timerLevel) * 1000
  }

  incrementMoneyAdderLevel = (): void => {
    const {
      money,
      moneyAdderLevel: oldMoneyAdderLevel,
      moneyAdderCost,
    } = this.state
    if (money >= moneyAdderCost) {
      const moneyAdderLevel = oldMoneyAdderLevel + 1
      this.setState({
        money: money - moneyAdderCost,
        moneyAdder: moneyAmount(this.getMoneyAdder(moneyAdderLevel)),
        moneyAdderLevel,
        moneyAdderCost: moneyAmount(Math.pow(1.4, moneyAdderLevel) * 10),
      })
    }
  }

  incrementTimerLevel = (): void => {
    const {
      money,
      timerLevel: oldTimerLevel,
      timerCost,
    } = this.state
    if (money >= timerCost) {
      const timerLevel = oldTimerLevel + 1
      this.setState({
        money: money - timerCost,
        timer: moneyAmount(this.getTimer(timerLevel)),
        timerLevel,
        timerCost: moneyAmount(Math.pow(1.4, timerLevel) * 10),
      })
    }
  }

  addMoney = (): void => {
    const { money, moneyAdder } = this.state
    this.setState({ money: money + moneyAdder })
  }

  run = (): void => {
    this.addMoney()
    this.runTimeout = window.setTimeout(() => this.run(), this.state.timer)
  }

  handleHover = (): void => {
    this.addMoney() // temporary
    this.hoverMoneyTimeout = window.setTimeout(() => this.handleHover())
  }

  stopHovering = (): void => {
    window.clearTimeout(this.hoverMoneyTimeout)
  }

  render(): JSX.Element {
    document.title = 'Incremental Game'

    const {
      incrementMoneyAdderLevel,
      incrementTimerLevel,
      addMoney,
      handleHover,
      stopHovering,
    } = this
    const {
      money,
      moneyAdder,
      moneyAdderLevel,
      moneyAdderCost,
      timer,
      timerLevel,
      timerCost,
    } = this.state

    return (
      <div>
        <div>Money: ${moneyFormat(money)}</div>
        <div>Money to add: ${moneyFormat(moneyAdder)}</div>
        <div>Time between adds: {timer} ms</div>
        <div>
          <div>Money Adder Level: {moneyAdderLevel}</div>
          <button
            className='btn'
            disabled={money < moneyAdderCost}
            onClick={incrementMoneyAdderLevel}>
            [incr] (${moneyFormat(moneyAdderCost)})
          </button>
        </div>
        <div>
          <div>Timer Level: {timerLevel}</div>
          <button
            className='btn'
            disabled={money < timerCost}
            onClick={incrementTimerLevel}>
            [incr] (${moneyFormat(timerCost)})
          </button>
        </div>
        <div
          onClick={addMoney}
          onMouseEnter={handleHover}
          onMouseLeave={stopHovering}
          style={{ width: '100px', height: '100px', background: 'red' }} />
      </div>
    )
  }
}