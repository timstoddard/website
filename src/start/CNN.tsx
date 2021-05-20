import axios, { AxiosResponse } from 'axios'
import classNames from 'classnames'
import * as React from 'react'
import styles from './scss/CNN.scss'
import styles2 from './scss/Start.scss'

interface Props {
  className: string
}

interface State {
  items: NewsItem[]
}

interface NewsItem {
  link: string
  origLink: string
  title: string
  description: string
}

export default class CNN extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { items: [] }
  }

  componentDidMount(): void {
    axios.get('https://n1wveabtqc.execute-api.us-east-2.amazonaws.com/default/cnn-current-top-stories')
      .then((response: AxiosResponse) => {
        this.setState({ items: response.data.items })
      })
      .catch((error: Error) => {
        console.error(error) // tslint:disable-line:no-console
      })
  }

  render(): JSX.Element {
    const { className } = this.props
    const { items } = this.state

    return (
      <div className={className}>
        {items.map(({ link, origLink, title, description }: NewsItem) => (
          <a
            key={link}
            href={origLink}
            target='_blank'
            rel='noopener noreferrer'
            className={classNames(styles.cnn__item, styles2.start__news__item)}>
            <div className={styles.cnn__item__title}>
              {title}
            </div>
            <div className={styles.cnn__item__description}>
              {description}
            </div>
          </a>
        ))}
      </div>
    )
  }
}
