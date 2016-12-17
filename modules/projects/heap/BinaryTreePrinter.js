import Node from './Node';

export default class {
  convertToNodes(arr) {
    let data = [];
    for (let i = 1; i <= arr.length; i++) {
      data[i] = new Node(arr[i - 1]);
    }
    for (let i = 1; i < data.length; i++) {
      if (i * 2 < data.length) {
        data[i].left = data[i * 2];
      } else {
        break;
      }
      if (i * 2 + 1 < data.length) {
        data[i].right = data[i * 2 + 1];
      }
    }
    return data[1];
  }

  printNode(arr) {
    let root = this.convertToNodes(arr);
    return this.printNodeInternal([root], 1, this.maxLevel(root));
  }

  printNodeInternal(nodes, level, maxLevel) {
    if (nodes.length === 0 || this.allElementsDNE(nodes)) {
      return '';
    }

    let floor = maxLevel - level + 1;
    let endgeLines = Math.floor(Math.pow(2, (Math.max(floor - 1, 0))));
    let firstSpaces = Math.floor(Math.pow(2, (floor)) - 1);
    let betweenSpaces = Math.floor(Math.pow(2, (floor + 1)) - 1);
    let treeString = '';

    treeString += this.printWhitespace(firstSpaces);
    let newNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      let value = nodes[i];
      if (!this.DNE(value)) {
        treeString += `<spanclass="heap__value">${value.data}</span>`;
        newNodes.push(value.left);
        newNodes.push(value.right);
      } else {
        treeString += ' ';
        newNodes.push(null);
        newNodes.push(null);
      }

      if (value != null && i < nodes.length - 1 && floor < maxLevel) {
        treeString += this.printWhitespace(betweenSpaces - ((value.data.toString()).length - 1));
      }
    }
    treeString += ','; // splitter character

    for (let i = 1; i <= endgeLines; i++) {
      for (let j = 0; j < nodes.length; j++) {
        treeString += this.printWhitespace(firstSpaces - i);
        if (j > 0) {
          treeString += this.printWhitespace(firstSpaces - i + 1);
        }
        if (this.DNE(nodes[j])) {
          treeString += this.printWhitespace(endgeLines + endgeLines + i + 1);
          continue;
        }

        if (!this.DNE(nodes[j].left)) {
          treeString += '/';
        } else {
          treeString += ' ';
        }

        treeString += this.printWhitespace(i + i - 1);

        if (!this.DNE(nodes[j].right)) {
          treeString += '\\';
        } else {
          treeString += ' ';
        }

        this.printWhitespace(endgeLines + endgeLines - i);
      }
      treeString += ','; // splitter character
    }

    treeString += this.printNodeInternal(newNodes, level + 1, maxLevel);
    if (level === 1) {
      treeString = treeString
        .replace(/[\s,]+$/, '') // remove whitespace after tree
        .replace(/[\s]+,/g, ',') // remove whitespace at end of lines
        .replace(/ /g, '&nbsp;')
        .replace(/spanclass/g, 'span class')
        .replace(/,/g, '<br>');
      // treeString = treeString.substr(0, treeString.length - 4).replace(/(?:&nbsp;)+$/, '');
//       $('.tree').html(`
// <span class="normal"><a onclick="showHeapOnTree(inputHeap)">Your input array</a>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${inputHeap}
// <br><a onclick="showHeapOnTree(sortedHeap)">Heap-formatted array</a>: ${sortedHeap}
// <br>Number of elements: ${inputHeap.heapSize()}
// <br>Number of levels: ${maxLevel}</span>
// <br><br>${treeString}<br>`);
    }
    return treeString;
  }

  DNE(value) {
    return value === null || value === undefined;
  }

  printWhitespace(len) {
    let temp = '';
    for (let i = 0; i < len; i++) {
      temp += ' ';
    }
    return temp;
  }

  maxLevel(node) {
    return this.DNE(node)
      ? 0
      : Math.max(
        this.maxLevel(this.DNE(node) ? node : node.left),
        this.maxLevel(this.DNE(node) ? node : node.right)) + 1;
  }

  allElementsDNE(list) {
    var allDNE = true;
    list.forEach(value => {
      if (!this.DNE(value)) {
        allDNE = false;
      }
    });
    return allDNE;
  }
}
