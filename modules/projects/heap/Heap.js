import React from 'react';
import { Link } from 'react-router';

import Node from './Node';
import BinaryHeap from './BinaryHeap';
import BinaryTreePrinter from './BinaryTreePrinter';

import './Heap.scss';

export default React.createClass({
  inputHeap: new BinaryHeap(false),
  sortedHeap: new BinaryHeap(true),
  printer: new BinaryTreePrinter(),
  getInitialState() {
    return {
      treeString: '',
      showTree: false
    };
  },
  componentDidMount() {
    this.checkUrlHash();
  },
  checkUrlHash() {
    try {
      let hashData = decodeURIComponent(window.location.hash.substr(1));
      if (/\d(\,\d+)*/.test(hashData)) {
        this.input.value = hashData;
        let ints = hashData.split(',').map(num => parseInt(num, 10));
        this.generateHeaps(ints);
      } else {
        window.location.hash = '';
      }
    } catch (e) {
      window.location.hash = '';
    }
  },
  processInput() {
    let rawInput = this.input.value.replace(/\s/g, '');
    if (rawInput.length === 0) {
      this.input.value = '';
      return;
    }
    let rawList = rawInput.split(',');
    if (rawList.length === 0 || (rawList.length === 1 && rawList[0].length === 0)) {
      this.input.value = '';
      return;
    }
    let ints = [];
    for (let i = 0; i < rawList.length; i++) {
      let temp = parseInt(rawList[i], 10);
      if (isNaN(temp)) {
        alert('Detected a non-numerical value in the array.\nPlease check your values and comma placement.');
        return;
      }
      ints[i] = temp;
    }

    this.generateHeaps(ints);
    let encoded = encodeURIComponent(ints);
    window.location.hash = encoded.length ? `#${encoded}` : '';
  },
  showSample() {
    window.location.hash = encodeURIComponent('1,2,3');
    this.checkUrlHash();
  },
  generateHeaps(ints) {
    this.inputHeap.init(ints.length);
    this.sortedHeap.init(ints.length);
    for (let i = 0; i < ints.length; i++) {
      this.inputHeap.insert(ints[i]);
      this.sortedHeap.insert(ints[i]);
    }
    let text = this.printer.printNode(this.inputHeap.heapContents());
    this.setState({
      treeString: text,
      showTree: ints.length > 0
    });
  },
  render() {
    document.title = 'Heap';
    return <div>
      <h5>Heap Tree Generator</h5>
      <div className="heap__input">
        <p>Paste your heap contents here:</p>
        <input
          ref={(input) => this.input = input}
          type="text" />
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
          className="heap__btn">
          1,2,3
        </a>
        &nbsp;(no enclosing brackets, spaces optional)
      </p>
      <p>Note: numbers with more than 3 digits will mess up the spacing.</p>
      {this.state.showTree && <hr />}
      <div
        dangerouslySetInnerHTML={{ __html: this.state.treeString }}
        className="heap__tree" />
    </div>;
  }
});
