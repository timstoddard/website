export default class {
  sort;
  maxCapacity;

  constructor(sort, maxCapacity) {
    this.sort = sort;
    this.init(maxCapacity);
  }

  init(length) {
    this.maxCapacity = length;
    this.arr = [];
    this.size = 0;
  }

  buildHeap(arr) { // takes an int array
    if (arr.length > this.maxCapacity) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      this.arr[i + 1] = arr[i];
      this.size++;
    }
    if (this.sort) {
      for (let i = Math.floor(this.size / 2); i >= 1; i--) {
        this.driftDown(i);
      }
    }
    return;
  }

  heapContents() {
    return this.arr.slice(1);
  }

  insert(i) {
    if (this.isFull()) {
      return;
    }
    this.arr[++this.size] = i;
    if (this.sort) {
      this.driftUp(this.size);
    }
    return;
  }

  findMax() {
    if (this.isEmpty()) {
      return null;
    }
    return this.arr[1];
  }

  deleteMax() {
    if (this.isEmpty()) {
      return;
    }
    this.arr[1] = this.arr[this.size];
    this.size--;
    this.driftDown(1);
    return;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.maxCapacity;
  }

  heapSize() {
    return this.size;
  }

  driftDown(hole) {
    let temp = this.arr[hole];
    while (Math.floor(hole * 2) <= this.size) {
      let child = Math.floor(hole * 2);
      if (child + 1 <= this.size && this.arr[child + 1] > this.arr[child]) {
        child++;
      }
      if (this.arr[child] > temp) {
        this.arr[hole] = this.arr[child];
        hole = child;
      } else {
        break;
      }
    }
    this.arr[hole] = temp;
  }

  driftUp(hole) {
    let temp = this.arr[hole];
    while (Math.floor(hole / 2) >= 1) {
      let parent = Math.floor(hole / 2);
      if (this.arr[parent] < temp) {
        this.arr[hole] = this.arr[parent];
        hole = parent;
      } else {
        break;
      }
    }
    this.arr[hole] = temp;
  }

  toString() {
    return this.arr.join(', ');
  }
}
