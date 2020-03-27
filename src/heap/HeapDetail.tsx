import * as React from 'react'
import Button from 'react-bootstrap/Button'
import BinaryHeap from './BinaryHeap'
import printTree from './BinaryTreePrinter'

interface Props {
  heap: BinaryHeap
  showInputHeap: () => void
  showSortedHeap: () => void
}

export default class HeapDetail extends React.Component<Props, {}> {
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
      <div className='heapDetail'>
        <hr />
        <Button
          onClick={showInputHeap}
          className='heapDetail__button'>
          show your input heap
        </Button>
        <Button
          onClick={showSortedHeap}
          className='heapDetail__button'>
          show sorted heap
        </Button>
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
