import React from 'react'

import printTree from './BinaryTreePrinter'

import './HeapInput.scss'

export default React.createClass({
  componentDidMount() {
    this.checkUrlHash()
  },
  checkUrlHash() {
    try {
      let hashData = decodeURIComponent(window.location.hash.substr(1))
      if (/\d(\,\d+)*/.test(hashData)) {
        this.input.value = hashData
        let ints = hashData.split(',').map(num => parseInt(num, 10))
        this.props.generateHeaps(ints)
      } else {
        window.location.hash = ''
        this.input.value = ''
        this.props.generateHeaps([])
      }
    } catch (e) {
      window.location.hash = ''
    }
  },
  showSample() {
    window.location.hash = encodeURIComponent('1,2,3')
    this.checkUrlHash()
  },
  processInput() {
    let rawInput = this.input.value.replace(/\s/g, '')
    if (rawInput.length === 0) {
      this.input.value = ''
      return
    }
    let rawList = rawInput.split(',')
    if (rawList.length === 0 || (rawList.length === 1 && rawList[0].length === 0)) {
      this.input.value = ''
      return
    }
    let ints = []
    for (let i = 0; i < rawList.length; i++) {
      let temp = parseInt(rawList[i], 10)
      if (isNaN(temp)) {
        alert('Detected a non-numerical value in the array.\nPlease check your values and comma placement.')
        return
      }
      ints[i] = temp
    }

    this.props.generateHeaps(ints)
    let encoded = encodeURIComponent(ints)
    window.location.hash = encoded.length ? `#${encoded}` : ''
  },
  render() {
    return <div className="heapInput">
      <div className="heapInput__form">
        <p>Paste your heap contents here:</p>
        <input
          ref={(input) => this.input = input}
          type="text"
           className="heapInput__form--textbox" />
        <a
          onClick={this.processInput}
          className="btn">
          Generate tree
        </a>
      </div>
      <p>
        Accepted format example:&nbsp;
        <a
          onClick={this.showSample}
          className="heapInput__sample">
          1,2,3
        </a>
        &nbsp;(no enclosing brackets, spaces optional)
      </p>
      <p>Note: numbers with more than 3 digits will mess up the spacing.</p>
    </div>
  }
})
