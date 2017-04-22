import React, { Component } from 'react'

import BinaryHeap from './BinaryHeap'
import HeapDetail from './HeapDetail'
import HeapInput from './HeapInput'

import './Heap.scss'

export default class Heap extends Component {
  constructor() {
    super()

    this.inputHeap = new BinaryHeap(false)
    this.sortedHeap = new BinaryHeap(true)

    this.generateHeaps = this.generateHeaps.bind(this)

    this.state = {
      showTree: false,
      isMounted: false,
    }
  }

  componentWillUnmount() {
    this.inputHeap = null
    this.sortedHeap = null
  }

  generateHeaps(ints) {
    this.inputHeap.init(ints.length)
    this.sortedHeap.init(ints.length)
    for (let i = 0; i < ints.length; i++) {
      this.inputHeap.insert(ints[i])
      this.sortedHeap.insert(ints[i])
    }
    this.setState({ showTree: ints.length > 0 })
  }

  render() {
    document.title = 'Heap'
    return (
      <div className="heap container">
        <h5 className="heap__title">Max-Heap Tree Generator</h5>
        <HeapInput generateHeaps={this.generateHeaps} />
        {this.state.showTree &&
          <HeapDetail
            inputHeap={this.inputHeap}
            sortedHeap={this.sortedHeap}
            />}
      </div>
    )
  }
}
