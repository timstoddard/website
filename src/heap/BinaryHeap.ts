export default class BinaryHeap {
  sort: boolean
  maxCapacity: number
  arr: number[]
  size: number

  constructor(sort: boolean, maxCapacity: number = Number.MAX_SAFE_INTEGER) {
    this.sort = sort
    this.init(maxCapacity)
  }

  init = (length: number): void => {
    this.maxCapacity = length
    this.arr = []
    this.size = 0
  }

  buildHeap = (arr: number[]): void => {
    if (arr.length > this.maxCapacity) {
      return
    }
    for (let i = 0; i < arr.length; i++) {
      this.arr[i + 1] = arr[i]
      this.size++
    }
    if (this.sort) {
      for (let i = Math.floor(this.size / 2); i >= 1; i--) {
        this.driftDown(i)
      }
    }
    return
  }

  heapContents = (): number[] => {
    return this.arr.slice(1)
  }

  insert = (i: number): void => {
    if (this.isFull()) {
      return
    }
    this.arr[++this.size] = i
    if (this.sort) {
      this.driftUp(this.size)
    }
    return
  }

  findMax = (): number => {
    if (this.isEmpty()) {
      return null
    }
    return this.arr[1]
  }

  deleteMax = (): void => {
    if (this.isEmpty()) {
      return
    }
    this.arr[1] = this.arr[this.size]
    this.size--
    this.driftDown(1)
    return
  }

  isEmpty = (): boolean => {
    return this.size === 0
  }

  isFull = (): boolean => {
    return this.size === this.maxCapacity
  }

  heapSize = (): number => {
    return this.size
  }

  treeHeight = (): number => {
    return Math.floor(Math.log2(this.arr.length - 1) + 1) || 0
  }

  driftDown = (hole: number): void => {
    const temp = this.arr[hole]
    while (Math.floor(hole * 2) <= this.size) {
      let child = Math.floor(hole * 2)
      if (child + 1 <= this.size && this.arr[child + 1] > this.arr[child]) {
        child++
      }
      if (this.arr[child] > temp) {
        this.arr[hole] = this.arr[child]
        hole = child
      } else {
        break
      }
    }
    this.arr[hole] = temp
  }

  driftUp = (hole: number): void => {
    const temp = this.arr[hole]
    while (Math.floor(hole / 2) >= 1) {
      const parent = Math.floor(hole / 2)
      if (this.arr[parent] < temp) {
        this.arr[hole] = this.arr[parent]
        hole = parent
      } else {
        break
      }
    }
    this.arr[hole] = temp
  }

  toString = (): string => {
    return this.arr.slice(1).join(', ')
  }
}
