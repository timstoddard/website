import React, { Component, PropTypes } from 'react'

import printTree from './BinaryTreePrinter'

export default class HeapDetail extends Component {
  constructor(props) {
    super(props)

    this.showInputHeap = this.showInputHeap.bind(this)
    this.showSortedHeap = this.showSortedHeap.bind(this)

    this.state = { showSorted: false }
  }

  getTreeString() {
    const { showSorted } = this.state
    const { sortedHeap, inputHeap } = this.props
    const treeString = showSorted
      ? printTree(sortedHeap)
      : printTree(inputHeap)
    return { __html: `${treeString}<br><br>` }
  }

  showInputHeap() {
    this.setState({ showSorted: false })
  }

  showSortedHeap() {
    this.setState({ showSorted: true })
  }

  render() {
    const { sortedHeap, inputHeap } = this.props
    const { showSorted } = this.state

    return (
      <div className="heapDetail blue-grey lighten-4">
        <hr />
        <a
          onClick={this.showInputHeap}
          className="btn heapDetail__button">
          show your input heap
        </a>
        <a
          onClick={this.showSortedHeap}
          className="btn heapDetail__button">
          show sorted heap
        </a>
        <p>Number of elements: {inputHeap.heapSize()}</p>
        <p>Number of levels: {inputHeap.treeHeight()}</p>
        <p>Heap in array form: {(showSorted ? sortedHeap : inputHeap).toString()}</p>
        <div className="heapDetail__treeWrapper">
          <div
            dangerouslySetInnerHTML={this.getTreeString()}
            className="heapDetail__tree"
            />
        </div>
      </div>
    )
  }
}
