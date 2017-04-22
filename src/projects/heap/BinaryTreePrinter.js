class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

export default function printTree(heap) {
  const arr = heap.heapContents()
  const maxLevel = heap.treeHeight()
  const root = convertToNodes(arr)
  return printTreeInternal([root], 1, maxLevel)
}

function printTreeInternal(nodes, level, maxLevel) {
  if (nodes.length === 0 || allElementsDNE(nodes)) {
    return ''
  }

  const floor = maxLevel - level + 1
  const endgeLines = Math.floor(Math.pow(2, (Math.max(floor - 1, 0))))
  const firstSpaces = Math.floor(Math.pow(2, (floor)) - 1)
  const betweenSpaces = Math.floor(Math.pow(2, (floor + 1)) - 1)
  let treeString = ''

  treeString += printWhitespace(firstSpaces)
  const newNodes = []
  for (let i = 0; i < nodes.length; i++) {
    const value = nodes[i]
    if (!DNE(value)) {
      treeString += `<spanclass="heap__value">${value.data}</span>`
      newNodes.push(value.left)
      newNodes.push(value.right)
    } else {
      treeString += ' '
      newNodes.push(null)
      newNodes.push(null)
    }

    if (value != null && i < nodes.length - 1 && floor < maxLevel) {
      treeString += printWhitespace(betweenSpaces - ((value.data.toString()).length - 1))
    }
  }
  treeString += ',' // splitter character

  for (let i = 1; i <= endgeLines; i++) {
    for (let j = 0; j < nodes.length; j++) {
      treeString += printWhitespace(firstSpaces - i)
      if (j > 0) {
        treeString += printWhitespace(firstSpaces - i + 1)
      }
      if (DNE(nodes[j])) {
        treeString += printWhitespace(endgeLines * 2 + i + 1)
        continue
      }

      if (!DNE(nodes[j].left)) {
        treeString += '/'
      } else {
        treeString += ' '
      }

      treeString += printWhitespace(i + i - 1)

      if (!DNE(nodes[j].right)) {
        treeString += '\\'
      } else {
        treeString += ' '
      }

      printWhitespace(endgeLines * 2 - i)
    }
    treeString += ',' // splitter character
  }

  treeString += printTreeInternal(newNodes, level + 1, maxLevel)
  if (level === 1) {
    treeString = treeString
      .replace(/[\s,]+$/, '') // remove whitespace after tree
      .replace(/[\s]+,/g, ',') // remove whitespace at end of lines
      .replace(/ /g, '&nbsp;')
      .replace(/spanclass/g, 'span class')
      .replace(/,/g, '<br>')
  }
  return treeString
}

// helper functions

function convertToNodes(arr) {
  const data = []
  for (let i = 1; i <= arr.length; i++) {
    data[i] = new Node(arr[i - 1])
  }
  for (let i = 1; i < data.length; i++) {
    if (i * 2 < data.length) {
      data[i].left = data[i * 2]
    } else {
      break
    }
    if (i * 2 + 1 < data.length) {
      data[i].right = data[i * 2 + 1]
    }
  }
  return data[1]
}

function DNE(value) {
  return value === null || value === undefined
}

function allElementsDNE(list) {
  var allDNE = true
  list.forEach(value => {
    if (!DNE(value)) {
      allDNE = false
    }
  })
  return allDNE
}

function printWhitespace(len) {
  let temp = ''
  for (let i = 0; i < len; i++) {
    temp += ' '
  }
  return temp
}
