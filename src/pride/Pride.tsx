import * as React from 'react'

const PERIOD = 225;
const COLUMNS = 500;
const ROWS = 6;
const ANIMATION_DURATION = 2; // keep in sync with scss

const arr = (n: number): null[] => new Array(n).fill(null)

interface PrideRowProps { n: number }
const PrideRow: React.StatelessComponent<PrideRowProps> = ({ n }: PrideRowProps): JSX.Element => {
  return (
    <div
      className={`
        pride__flagRow
        pride__flagRow${n}`} />
  )
}

interface PrideColumnProps { n: number }
const PrideColumn: React.StatelessComponent<PrideColumnProps> = ({ n }: PrideColumnProps): JSX.Element => {
  return (
    <div
      style={{ animationDelay : `${ANIMATION_DURATION * 1000 * ((n / PERIOD) % PERIOD)}ms` }}
      className='pride__flagColumn'>
      {arr(ROWS).map((_: unknown, i: number) => (
      <PrideRow
        key={i}
        n={i} />
    ))}
    </div>
  )
}

const Pride: React.StatelessComponent<{}> = (): JSX.Element => {
  document.title = 'We Are Proud'
  return (
    <div className='pride'>
      <div className='pride__flag'>
        {arr(COLUMNS).map((_: unknown, i: number) => (
          <PrideColumn
            key={i}
            n={i} />
        ))}
      </div>
    </div>
  )
}

export default Pride
