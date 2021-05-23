import classNames from 'classnames'
import * as React from 'react'
import CurrentElement from './CurrentElement'
import ElementCard from './ElementCard'
import elements, { Element } from './elements'
import ModeSelect from './ModeSelect'
import { EmptyObject } from '../types'
import styles from './scss/PeriodicTable.scss'
import styles2 from './scss/ElementCard.scss'

export enum Mode {
  NORMAL = 'NORMAL',
  ELECTRON_AFFINITY_TREND = 'ELECTRON_AFFINITY_TREND',
  FIRST_IONIZATION_ENERGY = 'FIRST_IONIZATION_ENERGY',
  SECOND_IONIZATION_ENERGY = 'SECOND_IONIZATION_ENERGY',
  THIRD_IONIZATION_ENERGY = 'THIRD_IONIZATION_ENERGY',
}

const columnElements = elements.filter((e: Element) => e.column !== null)
const lanthanoids = elements.filter((e: Element) => e.column === null && e.period === 6)
const actinoids = elements.filter((e: Element) => e.column === null && e.period === 7)

const getFSeries = (els: Element[], mode: Mode, setCurrentElement: (e: Element) => (() => void)): JSX.Element[] =>
  els.map((e: Element, i: number) => {
    const element = Object.assign({}, e, { period: e.period + 3 })
    return (
      <ElementCard
        key={e.number}
        e={element}
        setCurrentElement={setCurrentElement}
        renderInColumn={i + 3}
        mode={mode} />
    )
  })

interface State {
  currentElement: Element
  mode: Mode,
  showModeSelect: boolean,
}

export default class PeriodicTable extends React.Component<EmptyObject, State> {
  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      currentElement: null,
      mode: Mode.NORMAL,
      showModeSelect: false,
    }
  }

  setCurrentElement = (e: Element): (() => void) => (): void => {
    this.setState({ currentElement: e })
  }

  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ mode: (e.target as HTMLSelectElement).value as Mode })
  }

  toggleMode = (): void => {
    this.setState({ showModeSelect: !this.state.showModeSelect })
  }

  render(): JSX.Element {
    document.title = 'Periodic Table'
    const {
      setCurrentElement,
      handleSelectChange,
      toggleMode,
    } = this
    const {
      currentElement,
      mode,
      showModeSelect,
    } = this.state

    return (
      <div className={styles.pTable}>
        <div className={styles.pTable__table}>
          {/* main elements */}
          {columnElements.map((e: Element) => (
            <ElementCard
              key={e.number}
              e={e}
              setCurrentElement={setCurrentElement}
              mode={mode} />
          ))}
          {/* lanthanoids placeholder */}
          <div className={classNames(
              styles2.elementPlaceholder,
              styles2['elementPlaceholder--1'])}>
            57-71
          </div>
          {/* actinoids placeholder */}
          <div className={classNames(
              styles2.elementPlaceholder,
              styles2['elementPlaceholder--2'])}>
            89-103
          </div>
          {/* lanthanoids */}
          {getFSeries(lanthanoids, mode, setCurrentElement)}
          {/* actinoids */}
          {getFSeries(actinoids, mode, setCurrentElement)}
          {/* element details */}
          {currentElement && (
            <CurrentElement
              element={currentElement}
              mode={mode} />
          )}
        </div>
        <ModeSelect
          mode={mode}
          toggleMode={toggleMode}
          showModeSelect={showModeSelect}
          handleSelectChange={handleSelectChange} />
      </div>
    )
  }
}
