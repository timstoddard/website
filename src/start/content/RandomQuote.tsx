import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  className: string
}

interface State {
  quote: string
}

export default class RandomQuote extends React.Component<Props, State> {
  static propTypes: any = {
    className: PropTypes.string.isRequired,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      quote: '',
    }
  }

  componentDidMount(): void {
    $.ajax({
      url: 'https://www.reddit.com/r/quotes/top.json?sort=top&t=month',
      type: 'GET',
      success: (response: any): void => {
        const { children } = response.data
        const index = Math.floor(Math.random() * children.length)
        const quote = children[index].data.title
          .replace(/[“”"]/g, '') // remove quotation marks
          .replace(/\[\d+x\d+\]/g, '') // remove image data
          .replace(/\s+/g, ' ') // normalize spaces
          .trim()
        this.setState({ quote })
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
    const { quote } = this.state
    return (
      <div className={`center-align blue-grey lighten-3 z-depth-1 ${className}`}>
        <div>{quote}</div>
      </div>
    )
  }
}