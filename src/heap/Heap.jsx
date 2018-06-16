import React, { Component } from 'react'

import BinaryHeap from './BinaryHeap'
import HeapDetail from './HeapDetail'
import HeapInput from './HeapInput'

export default class Heap extends Component {
  constructor() {
    super()

    this.inputHeap = new BinaryHeap(false)
    this.sortedHeap = new BinaryHeap(true)

    this.generateHeaps = this.generateHeaps.bind(this)
    this.showInputHeap = this.showInputHeap.bind(this)
    this.showSortedHeap = this.showSortedHeap.bind(this)

    this.state = {
      showTree: false,
      heap: this.inputHeap,
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

  showInputHeap() {
    this.setState({ heap: this.inputHeap })
  }

  showSortedHeap() {
    this.setState({ heap: this.sortedHeap })
  }

  render() {
    document.title = 'Heap'
    const { generateHeaps, showInputHeap, showSortedHeap } = this
    const { showTree, heap } = this.state

    return (
      <div className="heap container">
        <h5 className="heap__title">
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
