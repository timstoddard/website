import * as React from 'react'

import elements, { Element, ElementType } from './elements'
import { Mode } from './PeriodicTable'

const maxElectronAffinity = elements.reduce(
  (prev: number, curr: Element) => curr.electronAffinity > prev ? curr.electronAffinity : prev, 0)

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

const ElementCard: React.StatelessComponent<Props> = ({
  e,
  setCurrentElement,
  renderInColumn,
  mode,
}: Props): JSX.Element => {
  let cardLayout = null
  let cardClass = null
  switch (mode) {
    case Mode.NORMAL:
      cardLayout = (<>
        <div className='element__number'>
          {e.number}
        </div>
        <div className='element__symbol'>
          {e.symbol}
        </div>
        <div className='element__atomicWeight'>
          {(typeof e.atomicWeight === 'number') ? (
            e.atomicWeight
          ) : (
            <em>{e.atomicWeight}</em>
          )}
        </div>
        <div
          className='element__type'
          style={{ backgroundColor: getTypeColor(e.type) }} />
      </>)
      cardClass = 'element'
      break
    case Mode.ELECTRON_AFFINITY_TREND:
      const opacity = e.electronAffinity / maxElectronAffinity
      cardLayout = (<>
        <div
          className='element__simpleMode'
          style={{ background: `rgba(255,0,0,${opacity})` }}>
          {e.symbol}
        </div>
      </>)
      cardClass = 'elementSimple'
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
