import React, { Component } from 'react'

const moneyFormat = n => n.toFixed(2)
const moneyAmount = n => parseFloat(moneyFormat(n), 10)

export default class IncrGame extends Component {
  constructor() {
    super()

    this.incrementMoneyAdderLevel = this.incrementMoneyAdderLevel.bind(this)
    this.incrementTimerLevel = this.incrementTimerLevel.bind(this)
    this.addMoney = this.addMoney.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.stopHovering = this.stopHovering.bind(this)

    this.state = {
      money: 10,
      moneyAdder: 1,
      moneyAdderLevel: 1,
      moneyAdderCost: 10,
      timer: 1000,
      timerLevel: 1,
      timerCost: 10,
      isHovering: false,
    }
  }

  componentWillMount() {
    this.run()
  }

  componentWillUnmount() {
    clearTimeout(this.runTimeout)
    clearTimeout(this.hoverMoneyTimeout)
  }

  getMoneyAdder(moneyAdderLevel) {
    return Math.pow(1.2, moneyAdderLevel)
  }

  getTimer(timerLevel) {
    return Math.pow(0.9, timerLevel) * 1000
  }

  incrementMoneyAdderLevel() {
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

  incrementTimerLevel() {
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

  addMoney() {
    const { money, moneyAdder } = this.state
    this.setState({ money: money + moneyAdder })
  }

  run() {
    this.addMoney()
    this.runTimeout = setTimeout(() => this.run(), this.state.timer)
  }

  handleHover() {
    this.addMoney()
    this.hoverMoneyTimeout = setTimeout(() => this.handleHover())
  }

  stopHovering() {
    clearTimeout(this.hoverMoneyTimeout)
  }

  render() {
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
            className="btn"
            disabled={money < moneyAdderCost}
            onClick={incrementMoneyAdderLevel}>
            [incr] (${moneyFormat(moneyAdderCost)})
          </button>
        </div>
        <div>
          <div>Timer Level: {timerLevel}</div>
          <button
            className="btn"
            disabled={money < timerCost}
            onClick={incrementTimerLevel}>
            [incr] (${moneyFormat(timerCost)})
          </button>
        </div>
        <div
          onClick={addMoney}
          onMouseEnter={handleHover}
          onMouseLeave={stopHovering}
          style={{ width: '100px', height: '100px', background: 'red' }}
          />
      </div>
    )
  }
}
