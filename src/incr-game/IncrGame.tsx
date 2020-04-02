import * as React from 'react'
import { Button } from 'react-bootstrap'
import styles from './scss/IncrGame.scss'

/**
 * ACRONYMS
 *
 * TPS: tears per second
 * TPC: tears per click
 */

const PRODUCER_COST_EXPONENT = 1.3
const CLICK_UPGRADE_COST_EXPONENT = 1.6
const MAX_INCREMENTS_PER_SECOND = 13
const BASE_TPS = 0
const BASE_TPC = 1

interface Producer {
  name: string
  baseCost: number
  tps: number
}

const producers: Producer[] = [
  {
    name: 'Producer 1',
    baseCost: 10,
    tps: 2,
  },
  {
    name: 'Producer 2',
    baseCost: 100,
    tps: 10,
  },
  {
    name: 'Producer 3',
    baseCost: 500,
    tps: 80,
  },
]

interface ClickUpgrade {
  name: string
  baseCost: number
  tpc: number
}

const clickUpgrades: ClickUpgrade[] = [
  {
    name: 'Click Upgrade 1',
    baseCost: 50,
    tpc: 1,
  },
  {
    name: 'Click Upgrade 2',
    baseCost: 200,
    tpc: 5,
  },
  {
    name: 'Click Upgrade 3',
    baseCost: 1000,
    tpc: 12,
  },
]

interface State {
  tears: number
  tps: number
  tpc: number
  producerCounts: number[]
  clickUpgradeCounts: number[]
}

export default class IncrGame extends React.Component<{}, State> {
  stepTimeout: number

  constructor(props: {}) {
    super(props)

    this.state = {
      tears: 10,
      tps: BASE_TPS,
      tpc: BASE_TPC,
      producerCounts: new Array(producers.length).fill(0),
      clickUpgradeCounts: new Array(clickUpgrades.length).fill(0),
    }
  }

  componentDidMount = () => {
  }

  componentWillUnmount = () => {
    clearTimeout(this.stepTimeout)
  }

  step = () => {
    const {
      tears,
      tps,
    } = this.state

    if (tps <= 0) {
      // do nothing
    } else if (tps < MAX_INCREMENTS_PER_SECOND) {
      this.setState({
        tears: tears + 1,
      })
      this.stepTimeout = setTimeout(this.step, 1000 / tps) as unknown as number
    } else {
      this.setState({
        tears: tears + (tps / MAX_INCREMENTS_PER_SECOND),
      })
      this.stepTimeout = setTimeout(this.step, 100) as unknown as number
    }
  }

  buyProducer = (index: number) => () => {
    const {
      tears,
      producerCounts,
    } = this.state
    const cost = this.getProducerCost(index)
    if (tears >= cost) {
      const newCounts = [...producerCounts]
      newCounts[index]++
      this.setState({
        tears: tears - cost,
        tps: this.calculateTps(newCounts),
        producerCounts: newCounts,
      }, () => {
        // if first item bought, start tps timer
        if (!this.stepTimeout) {
          this.step()
        }
      })
    }
  }

  buyClickUpgrade = (index: number) => () => {
    const {
      tears,
      clickUpgradeCounts,
    } = this.state
    const cost = this.getClickUpgradeCost(index)
    if (tears >= cost) {
      const newCounts = [...clickUpgradeCounts]
      newCounts[index]++
      this.setState({
        tears: tears - cost,
        tpc: this.calculateTpc(newCounts),
        clickUpgradeCounts: newCounts,
      })
    }
  }

  canBuyProducer = (index: number) => {
    const { tears } = this.state
    return tears >= this.getProducerCost(index)
  }

  canBuyClickUpgrade = (index: number) => {
    const { tears } = this.state
    return tears >= this.getClickUpgradeCost(index)
  }

  calculateTps = (producerCounts: number[]) => {
    if (producerCounts.length !== producers.length) {
      throw new Error(`producerCounts expected length ${producers.length}, got ${producerCounts.length} (${producerCounts}).`)
    }

    let total = 0
    for (let i = 0; i < producers.length; i++) {
      total += producers[i].tps * producerCounts[i]
    }
    return total
  }

  calculateTpc = (clickUpgradeCounts: number[]) => {
    if (clickUpgradeCounts.length !== clickUpgrades.length) {
      throw new Error(`clickUpgradeCounts expected length ${clickUpgrades.length}, got ${clickUpgradeCounts.length} (${clickUpgradeCounts}).`)
    }

    let total = 0
    for (let i = 0; i < clickUpgrades.length; i++) {
      total += clickUpgrades[i].tpc * clickUpgradeCounts[i]
    }
    return BASE_TPC + total
  }

  getProducerCost = (index: number) => {
    const {
      producerCounts,
    } = this.state
    const count = producerCounts[index]
    const { baseCost } = producers[index]
    return baseCost * Math.pow(PRODUCER_COST_EXPONENT, count)
  }

  getClickUpgradeCost = (index: number) => {
    const {
      clickUpgradeCounts,
    } = this.state
    const count = clickUpgradeCounts[index]
    const { baseCost } = clickUpgrades[index]
    return baseCost * Math.pow(CLICK_UPGRADE_COST_EXPONENT, count)
  }

  handleClick = () => {
    const {
      tears,
      tpc,
    } = this.state
    this.setState({ tears: tears + tpc })
  }

  render(): JSX.Element {
    document.title = `Make 'em Cry`

    const {
      buyProducer,
      buyClickUpgrade,
      canBuyProducer,
      canBuyClickUpgrade,
      getProducerCost,
      getClickUpgradeCost,
      handleClick,
    } = this
    const {
      tears,
      tps,
      tpc,
      producerCounts,
      clickUpgradeCounts,
    } = this.state

    return (
      <div className={styles.incrGame}>
        <div
          onClick={handleClick}
          className={styles.incrGame__clickTarget}>
          {'TODO <silly image here>'}
        </div>
        <div className={styles.incrGame__stats}>
          <div>Tears: {Math.round(tears)}</div>
          <div>per second: {Math.round(tps)}</div>
          <div>per click: {Math.round(tpc)}</div>
        </div>
        <div className={styles.incrGame__producers}>
          {producers.map((producer: any, i: number) => (
            <div key={producer.name}>
              <div>{producer.name} ({producerCounts[i]})</div>
              <Button
                onClick={buyProducer(i)}
                disabled={!canBuyProducer(i)}
                className={styles.incrGame__button}>
                <div>Cost: {Math.round(getProducerCost(i))}</div>
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.incrGame__clickUpgrades}>
          {clickUpgrades.map((clickUpgrade: any, i: number) => (
            <div key={clickUpgrade.name}>
              <div>{clickUpgrade.name} ({clickUpgradeCounts[i]})</div>
              <Button
                onClick={buyClickUpgrade(i)}
                disabled={!canBuyClickUpgrade(i)}
                className={styles.incrGame__button}>
                <div>Cost: {Math.round(getClickUpgradeCost(i))}</div>
              </Button>
            </div>
          ))}
        </div>
        <div
          onClick={() => this.setState({ tears: tears + 1000000000 })}
          className={styles.incrGame__devButton}>
          [dev mode]: click me
        </div>
      </div>
    )
  }

  private formatNumber = (n: number) => {
    const value = n
    const suffixes = ['K', 'M', 'B', 'T']
    let suffixIndex = 0
    while (n >= 1000) {
      n /= 1000
      suffixIndex++
    }
    const suffix = suffixes[suffixIndex]
    return `${value}${suffix}`
  }
}
