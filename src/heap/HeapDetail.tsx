import * as PropTypes from 'prop-types'
import * as React from 'react'

import BinaryHeap from './BinaryHeap'
import printTree from './BinaryTreePrinter'

interface Props {
  heap: BinaryHeap
  showInputHeap: () => void
  showSortedHeap: () => void
}

export default class HeapDetail extends React.Component<Props, {}> {
  static propTypes: any = {
    heap: PropTypes.instanceOf(BinaryHeap).isRequired,
    showInputHeap: PropTypes.func.isRequired,
    showSortedHeap: PropTypes.func.isRequired,
  }

  constructor(props: Props) {
    super(props)
  }

  getTreeString = (): { __html: string } => {
    const { heap } = this.props
    return { __html: `${printTree(heap)}<br><br>` }
  }

  render(): JSX.Element {
    const { heap, showInputHeap, showSortedHeap } = this.props

    return (
      <div className='heapDetail blue-grey lighten-4'>
        <hr />
        <a
          onClick={showInputHeap}
          className='heapDetail__button btn'>
          show your input heap
        </a>
        <a
          onClick={showSortedHeap}
          className='heapDetail__button btn'>
          show sorted heap
        </a>
        <p>Number of elements: {heap.heapSize()}</p>
        <p>Number of levels: {heap.treeHeight()}</p>
        <p>Heap in array form: {heap.toString()}</p>
        <div className='heapDetail__treeWrapper'>
          <div
            dangerouslySetInnerHTML={this.getTreeString()}
            className='heapDetail__tree' />
        </div>
      </div>
    )
  }
}
