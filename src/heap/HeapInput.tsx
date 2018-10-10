import * as PropTypes from 'prop-types'
import * as React from 'react'

interface Props {
  generateHeaps: (ints: number[]) => void
}

export default class HeapInput extends React.Component<Props, {}> {
  static propTypes: any = {
    generateHeaps: PropTypes.func,
  }

  static defaultProps: any = {
    generateHeaps: (): void => {},
  }

  input: HTMLInputElement

  constructor(props: Props) {
    super(props)
  }

  componentDidMount(): void {
    this.checkUrlHash()
  }

  checkUrlHash = (): void => {
    try {
      const { generateHeaps } = this.props
      const hashData = decodeURIComponent(window.location.hash.substr(1))
      if (/\d(,\d+)*/.test(hashData)) {
        this.input.value = hashData
        const ints = hashData.split(',').map((n: string) => parseInt(n, 10))
        generateHeaps(ints)
      } else {
        window.location.hash = ''
        this.input.value = ''
        generateHeaps([])
      }
    } catch (e) {
      window.location.hash = ''
    }
  }

  showSample = (): void => {
    window.location.hash = encodeURIComponent('1,2,3')
    this.checkUrlHash()
  }

  processInput = (): void => {
    const rawInput = this.input.value.replace(/\s/g, '')
    if (rawInput.length === 0) {
      this.input.value = ''
      return
    }
    const rawList = rawInput.split(',')
    if (rawList.length === 0 || (rawList.length === 1 && rawList[0].length === 0)) {
      this.input.value = ''
      return
    }
    const ints = []
    for (let i = 0; i < rawList.length; i++) {
      const temp = parseInt(rawList[i], 10)
      if (isNaN(temp)) {
        alert('Detected a non-numerical value in the array.\nPlease check your values and comma placement.')
        return
      }
      ints[i] = temp
    }

    this.props.generateHeaps(ints)
    const encoded = encodeURIComponent(ints.toString())
    window.location.hash = encoded.length ? `#${encoded}` : ''
  }

  render(): JSX.Element {
    return (
      <div className='heapInput'>
        <div className='heapInput__form'>
          <p>Paste your heap contents here:</p>
          <input
            ref={(input: HTMLInputElement): void => { this.input = input }}
            type='text'
            className='heapInput__form--textbox' />
          <a
            onClick={this.processInput}
            className='btn'>
            Generate tree
          </a>
        </div>
        <p>
          Accepted format example:&nbsp;
          <a
            onClick={this.showSample}
            className='heapInput__sample'>
            1,2,3
          </a>
          &nbsp;(no enclosing brackets, spaces optional)
        </p>
        <p>Note: numbers with more than 3 digits will mess up the spacing.</p>
      </div>
    )
  }
}