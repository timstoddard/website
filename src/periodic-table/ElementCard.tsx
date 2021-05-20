import * as React from 'react'
import elements, { Element, ElementType } from './elements'
import { Mode } from './PeriodicTable'
import styles from './scss/ElementCard.scss'

const getMin = (field: keyof Element) => (prev: number, curr: Element) => {
  const value = curr[field] as number
  if (value === null) {
    return prev
  }
  return value < prev ? value : prev
}
const getMax = (field: keyof Element) => (prev: number, curr: Element) => {
  const value = curr[field] as number
  if (value === null) {
    return prev
  }
  return value > prev ? value : prev
}

const minElectronAffinity = elements.reduce(getMin('electronAffinity'), Infinity)
const maxElectronAffinity = elements.reduce(getMax('electronAffinity'), -Infinity)

const minFirstIonizationEnergy = elements.reduce(getMin('firstIonizationEnergy'), Infinity)
const maxFirstIonizationEnergy = elements.reduce(getMax('firstIonizationEnergy'), -Infinity)

const minSecondIonizationEnergy = elements.reduce(getMin('secondIonizationEnergy'), Infinity)
const maxSecondIonizationEnergy = elements.reduce(getMax('secondIonizationEnergy'), -Infinity)

const minThirdIonizationEnergy = elements.reduce(getMin('thirdIonizationEnergy'), Infinity)
const maxThirdIonizationEnergy = elements.reduce(getMax('thirdIonizationEnergy'), -Infinity)

const percentInRange = (value: number, min: number, max: number) => {
  if (value === null) {
    return 0
  }
  return (value - min) / (max - min)
}

const getGridArea = (e: Element, column?: number): string =>
  column !== undefined
    ? `${e.period} / ${column} / ${e.period + 1} / ${column + 1}`
    : `${e.period} / ${e.column} / ${e.period + 1} / ${e.column + 1}`

const getTypeColor = (type: ElementType): string => {
  switch (type) {
    case ElementType.ALKALI_METAL:
      return 'rgb(255,0,0)' // red
    case ElementType.ALKALINE_EARTH_METAL:
      return 'rgb(255,123,0)' // orange
    case ElementType.TRANSITION_METAL:
      return 'rgb(255,255,0)' // yellow
    case ElementType.POST_TRANSITION_METAL:
      return 'rgb(20,255,0)' // green
    case ElementType.METALLOID:
      return 'rgb(0,250,255)' // blue
    case ElementType.NOBLE_GAS:
      return 'rgb(183,0,255)' // purple
    case ElementType.OTHER_NONMETAL:
      return 'rgb(255,10,240)' // pink
    case ElementType.LANTHANOID:
      return 'rgb(255,255,255)' // white
    case ElementType.ACTINOID:
      return 'rgb(180,180,180)' // gray
  }
}

interface Props {
  e: Element
  setCurrentElement: (e: Element) => (() => void)
  renderInColumn?: number
  mode: Mode
}

const ElementCard: React.FunctionComponent<Props> = ({
  e,
  setCurrentElement,
  renderInColumn,
  mode,
}: Props): JSX.Element => {
  let cardLayout = null
  let cardClass = null
  const simpleCard = (opacity: number) => (<>
    <div
      className={styles.element__simpleMode}
      style={{ background: `rgba(255,0,0,${opacity})` }}>
      {e.symbol}
    </div>
  </>)

  switch (mode) {
    case Mode.NORMAL:
      cardLayout = (<>
        <div className={styles.element__number}>
          {e.number}
        </div>
        <div className={styles.element__symbol}>
          {e.symbol}
        </div>
        <div className={styles.element__atomicWeight}>
          {(typeof e.atomicWeight === 'number') ? (
            e.atomicWeight
          ) : (
            <em>{e.atomicWeight}</em>
          )}
        </div>
        <div
          className={styles.element__type}
          style={{ backgroundColor: getTypeColor(e.type) }} />
      </>)
      cardClass = styles.element
      break
    case Mode.ELECTRON_AFFINITY_TREND:
      cardLayout = simpleCard(percentInRange(
        e.electronAffinity, minElectronAffinity, maxElectronAffinity))
      cardClass = styles.elementSimple
      break
    case Mode.FIRST_IONIZATION_ENERGY:
      cardLayout = simpleCard(percentInRange(
        e.firstIonizationEnergy, minFirstIonizationEnergy, maxFirstIonizationEnergy))
      cardClass = styles.elementSimple
      break
    case Mode.SECOND_IONIZATION_ENERGY:
      cardLayout = simpleCard(percentInRange(
        e.secondIonizationEnergy, minSecondIonizationEnergy, maxSecondIonizationEnergy))
      cardClass = styles.elementSimple
      break
    case Mode.THIRD_IONIZATION_ENERGY:
      cardLayout = simpleCard(percentInRange(
        e.thirdIonizationEnergy, minThirdIonizationEnergy, maxThirdIonizationEnergy))
      cardClass = styles.elementSimple
      break
  }
  return (
    <div
      key={e.number}
      onMouseOver={setCurrentElement(e)}
      className={cardClass}
      style={{
        gridArea: getGridArea(e, renderInColumn),
      }}>
      {cardLayout}
    </div>
  )
}

export default ElementCard
