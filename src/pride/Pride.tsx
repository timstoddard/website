import classNames from 'classnames'
import * as React from 'react'

const styles = require('./scss/Pride.scss') // tslint:disable-line no-var-requires

const PERIOD = 225;
const COLUMNS = 500;
const ROWS = 6;
const ANIMATION_DURATION = 2; // keep in sync with scss

const arr = (n: number): null[] => new Array(n).fill(null)

interface PrideRowProps { n: number }
const PrideRow: React.StatelessComponent<PrideRowProps> = ({ n }: PrideRowProps): JSX.Element => {
  return (
    <div
      className={classNames(
        styles.pride__flagRow,
        styles[`pride__flagRow${n}`])} />
  )
}

interface PrideColumnProps { n: number }
const PrideColumn: React.StatelessComponent<PrideColumnProps> = ({ n }: PrideColumnProps): JSX.Element => {
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

export default class Pride extends React.Component<{}, State> {
  constructor(props: {}) {
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
        <div className={styles.pride__flag}>
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
