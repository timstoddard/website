import * as React from 'react'
import { Button } from 'react-bootstrap'
import styles from './scss/HeapInput.scss'

interface Props {
  generateHeaps: (ints: number[]) => void
}

export default class HeapInput extends React.Component<Props, {}> {
  input: React.RefObject<HTMLInputElement> = React.createRef()

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
        this.input.current.value = hashData
        const ints = hashData.split(',').map((n: string) => parseInt(n, 10))
        generateHeaps(ints)
      } else {
        window.location.hash = ''
        this.input.current.value = ''
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
    const rawInput = this.input.current.value.replace(/\s/g, '')
    if (rawInput.length === 0) {
      this.input.current.value = ''
      return
    }
    const rawList = rawInput.split(',')
    if (rawList.length === 0 || (rawList.length === 1 && rawList[0].length === 0)) {
      this.input.current.value = ''
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
      <div>
        <div className={styles.heapInput__form}>
          <p>Paste your heap contents here:</p>
          <input
            ref={this.input}
            type='text'
            className={styles['heapInput__form--textbox']} />
          <Button onClick={this.processInput}>
            Generate tree
          </Button>
        </div>
        <p>
          Accepted format example:&nbsp;
          <a
            onClick={this.showSample}
            className={styles.heapInput__sample}>
            1,2,3
          </a>
          &nbsp;(no enclosing brackets, spaces optional)
        </p>
        <p>Note: numbers with more than 3 digits will mess up the spacing.</p>
      </div>
    )
  }
}
