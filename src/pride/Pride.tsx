import classNames from 'classnames'
import * as React from 'react'
import { EmptyObject } from '../types'
import styles from './scss/Pride.scss'

const PERIOD = 225
const COLUMNS = 500
const ROWS = 6
const ANIMATION_DURATION = 2 // keep in sync with scss

const arr = (n: number): null[] => new Array(n).fill(null)

interface PrideRowProps { n: number }
const PrideRow: React.FunctionComponent<PrideRowProps> = ({ n }: PrideRowProps): JSX.Element => {
  return (
    <div
      className={classNames(
        styles.pride__flagRow,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (styles as any)[`pride__flagRow${n}`])} />
  )
}

interface PrideColumnProps { n: number }
const PrideColumn: React.FunctionComponent<PrideColumnProps> = ({ n }: PrideColumnProps): JSX.Element => {
  return (
    <div
      style={{ animationDelay : `${ANIMATION_DURATION * 1000 * (n / PERIOD)}ms` }}
      className={styles.pride__flagColumn}>
      {arr(ROWS).map((_: unknown, i: number) => (
      <PrideRow
        key={i}
        n={i} />
    ))}
    </div>
  )
}

interface State {
  showingBorder: boolean
}

export default class Pride extends React.Component<EmptyObject, State> {
  constructor(props: EmptyObject) {
    super(props)

    this.state = {
      showingBorder: false,
    }
  }

  toggleShowingBorder = (): void => {
    this.setState({ showingBorder: !this.state.showingBorder })
  }

  render(): JSX.Element {
    document.title = 'We Are Proud'

    const { toggleShowingBorder } = this
    const { showingBorder } = this.state

    return (
      <div className={styles.pride}>
        <div
          onClick={toggleShowingBorder}
          className={classNames(
            styles.pride__border,
            { [styles['pride__border--visible']]: showingBorder })} />
        <div>
          {arr(COLUMNS).map((_: unknown, i: number) => (
            <PrideColumn
              key={i}
              n={i} />
          ))}
        </div>
      </div>
    )
  }
}
