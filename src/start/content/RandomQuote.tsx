import axios, { AxiosResponse } from 'axios'
import * as React from 'react'

interface State {
  quote: string
}

export default class RandomQuote extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      quote: '',
    }
  }

  componentDidMount(): void {
    axios.get('https://www.reddit.com/r/quotes/top.json?sort=top&t=month')
      .then((response: AxiosResponse) => {
        const { children } = response.data.data
        const index = Math.floor(Math.random() * children.length)
        const quote = children[index].data.title
          .replace(/[“”"]/g, '') // remove quotation marks
          .replace(/\[\d+x\d+\]/g, '') // remove image data
          .replace(/\s+/g, ' ') // normalize spaces
          .trim()
        this.setState({ quote })
      })
      .catch((error: Error) => {
        console.error(error) // tslint:disable-line:no-console
      })
  }

  render(): JSX.Element {
    const { quote } = this.state

    return (
      <div className='randomQuote center-align blue-grey lighten-3 z-depth-1'>
        <div>{quote}</div>
      </div>
    )
  }
}
