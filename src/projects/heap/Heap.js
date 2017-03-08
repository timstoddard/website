import React from 'react';

import BinaryHeap from './BinaryHeap';
import HeapDetail from './HeapDetail';
import HeapInput from './HeapInput';

import './Heap.scss';

export default React.createClass({
  inputHeap: null,
  sortedHeap: null,
  getInitialState() {
    return { hideTree: true };
  },
  componentDidMount() {
    this.inputHeap = new BinaryHeap(false);
    this.sortedHeap = new BinaryHeap(true);
  },
  generateHeaps(ints) {
    this.inputHeap.init(ints.length);
    this.sortedHeap.init(ints.length);
    for (let i = 0; i < ints.length; i++) {
      this.inputHeap.insert(ints[i]);
      this.sortedHeap.insert(ints[i]);
    }
    this.setState({ hideTree: ints.length === 0 });
  },
  render() {
    document.title = 'Heap';
    return <div className="heap container">
      <h5>Max-Heap Tree Generator</h5>
      <HeapInput generateHeaps={this.generateHeaps} />
      {!this.state.hideTree && <HeapDetail
        inputHeap={this.inputHeap}
        sortedHeap={this.sortedHeap} />}
    </div>;
  }
});