import * as React from 'react'
import BinaryHeap from './BinaryHeap'
import HeapDetail from './HeapDetail'
import HeapInput from './HeapInput'

const styles = require('./scss/Heap.scss') // tslint:disable-line no-var-requires

interface State {
  showTree: boolean
  heap: BinaryHeap
}

export default class Heap extends React.Component<{}, State> {
  inputHeap: BinaryHeap
  sortedHeap: BinaryHeap

  constructor(props: {}) {
    super(props)

    this.inputHeap = new BinaryHeap(false)
    this.sortedHeap = new BinaryHeap(true)

    this.state = {
      showTree: false,
      heap: this.inputHeap,
    }
  }

  componentWillUnmount(): void {
    this.inputHeap = null
    this.sortedHeap = null
  }

  generateHeaps = (ints: number[]): void => {
    this.inputHeap.init(ints.length)
    this.sortedHeap.init(ints.length)
    for (const n of ints) {
      this.inputHeap.insert(n)
      this.sortedHeap.insert(n)
    }
    this.setState({ showTree: ints.length > 0 })
  }

  showInputHeap = (): void => {
    this.setState({ heap: this.inputHeap })
  }

  showSortedHeap = (): void => {
    this.setState({ heap: this.sortedHeap })
  }

  render(): JSX.Element {
    document.title = 'Heap'
    const {
      generateHeaps,
      showInputHeap,
      showSortedHeap,
    } = this
    const {
      showTree,
      heap,
    } = this.state

    return (
      <div className={styles.heap}>
        <h5 className={styles.heap__title}>
          Max-Heap Tree Generator
        </h5>
        <HeapInput generateHeaps={generateHeaps} />
        {showTree &&
          <HeapDetail
            heap={heap}
            showInputHeap={showInputHeap}
            showSortedHeap={showSortedHeap} />
        }
      </div>
    )
  }
}
