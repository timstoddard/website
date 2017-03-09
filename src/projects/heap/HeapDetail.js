import React from 'react'

import printTree from './BinaryTreePrinter'

import './HeapDetail.scss'

export default React.createClass({
  getInitialState() {
    return { showSorted: false }
  },
  showInputHeap() {
    this.setState({ showSorted: false })
  },
  showSortedHeap() {
    this.setState({ showSorted: true })
  },
  getTreeString() {
    let treeString = this.state.showSorted
      ? printTree(this.props.sortedHeap)
      : printTree(this.props.inputHeap)
    return { __html: `${treeString}<br><br>` }
  },
  render() {
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
        <p>Number of elements: {this.props.inputHeap.heapSize()}</p>
        <p>Number of levels: {this.props.inputHeap.treeHeight()}</p>
        <p>Heap in array form: {this.props[this.state.showSorted ? 'sortedHeap' : 'inputHeap'].toString()}</p>
        <div className="heapDetail__treeWrapper">
          <div
            dangerouslySetInnerHTML={this.getTreeString()}
            className="heapDetail__tree" />
        </div>
      </div>
    )
  }
})
