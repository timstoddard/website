import React from 'react';

import printTree from './BinaryTreePrinter';

import './HeapDetail.scss';

export default React.createClass({
  getInitialState() {
    return { showSorted: false };
  },
  showInputHeap() {
    this.setState({ showSorted: false });
  },
  showSortedHeap() {
    this.setState({ showSorted: true });
  },
  getTreeString() {
    let treeString = this.state.showSorted
      ? printTree(this.props.sortedHeap)
      : printTree(this.props.inputHeap);
    return { __html: treeString };
  },
  render() {
    return <div className="heapDetail">
      <hr />
      <a
        onClick={this.showInputHeap}>
        show your input heap ({this.props.inputHeap.toString()})
      </a>
      <a
        onClick={this.showSortedHeap}>
        show sorted heap ({this.props.sortedHeap.toString()})
      </a>
      <p>Number of elements: {this.props.inputHeap.heapSize()}</p>
      <p>Number of levels: {this.props.inputHeap.treeHeight()}</p>
      <div
        dangerouslySetInnerHTML={this.getTreeString()}
        className="heapDetail__tree" />
    </div>;
  }
});
