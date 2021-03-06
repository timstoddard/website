import classNames from 'classnames'
import * as React from 'react'
import styles from './scss/RandomQuote.scss'

const quotes = [
  'Breathe.',
  'Take a deep breath.',
  // TODO add more quotes
]

const getRandomQuote = (): string =>
  quotes[Math.floor(Math.random() * quotes.length)]

interface Props {
  className: string
}

interface State {
  quote: string
}

export default class RandomQuote extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      quote: getRandomQuote(),
    }
  }

  render(): JSX.Element {
    const { className } = this.props
    const { quote } = this.state

    return (
      <div className={classNames(styles.randomQuote, className)}>
        <div className={styles.randomQuote__text}>
          {quote}
        </div>
      </div>
    )
  }
}
