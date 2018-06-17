import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  className: string
}

interface State {
  data: any[]
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

    this.state = { data: [] }
  }

  componentDidMount(): void {
    $.ajax({
      url: '/cnn-rss-feed',
      type: 'GET',
      success: (response: string): void => {
        const data = JSON.parse(response)
        this.setState({ data: data.items })
      },
      error: (error: any): void => {
        // tslint:disable-next-line:no-console
        console.error(error)
      },
      timeout: 10000,
    })
  }

  render(): JSX.Element {
    const { className } = this.props
    const { data } = this.state

    return (
      <div className={`blue-grey lighten-3 z-depth-1 ${className}`}>
        {data.map(({ link, origLink, title, description }: NewsItem) => (
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
