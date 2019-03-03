import axios, { AxiosResponse } from 'axios'
import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  className: string
}

interface State {
  items: any[]
}

interface NewsItem {
  link: string
  origLink: string
  title: string
  description: string
}

export default class CNN extends React.Component<Props, State> {
  static propTypes: any = {
    className: PropTypes.string.isRequired,
  }

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
      <div className={`blue-grey lighten-3 z-depth-1 ${className}`}>
        {items.map(({ link, origLink, title, description }: NewsItem) => (
          <a
            key={link}
            href={origLink}
            target='_blank'
            rel='noopener noreferrer'
            className='rssItem'>
            <div className='rssItem__title'>
              {title}
            </div>
            <div className='rssItem__description'>
              {description}
            </div>
          </a>
        ))}
      </div>
    )
  }
}
