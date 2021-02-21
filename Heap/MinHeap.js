class MinHeap {
  constructor() {
    /* Initialing the array heap and adding a dummy element at index 0 */
    this.heap = [null];
  }

  getMin() {
    /* Accessing the min element at index 1 in the heap array */
    return this.heap[1];
  }

  insert(node) {
    /* Inserting the new node at the end of the heap array */
    this.heap.push(node);

    /* Finding the correct position for the new node */
    if (this.heap.length > 1) {
      let current = this.heap.length - 1; // 堆尾元素索引

      /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
      while (
        current > 1 &&
        this.heap[Math.floor(current / 2)] > this.heap[current]
      ) {
        /* Swapping the two nodes by using the ES6 destructuring syntax*/
        [this.heap[Math.floor(current / 2)], this.heap[current]] = [
          this.heap[current],
          this.heap[Math.floor(current / 2)],
        ];

        // 将current索引更新为父节点索引，以便一层层向上
        current = Math.floor(current / 2);
      }
    }
  }

  remove() {
    /* heap只有null一个元素*/
    if (this.heap.length < 2) {
      return null;
    }
    /* Remove Operation should return the removed element */
    let smallest = this.heap[1];

    if (this.heap.length === 2) {
      this.heap.splice(1, 1);
      return smallest;
    } else {
      /* In this block,this.heap.length > 2 */

      if (this.heap.length === 3) {
        if (this.heap[1] > this.heap[2]) {
          [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
        }
        return smallest;
      }
      /* 填补root */
      this.heap[1] = this.heap[this.heap.length - 1];
      this.heap.length--;

      let current = 1;
      let leftChildIndex = 2 * current + 1;
      let rightChildIndex = 2 * current + 2;
      let beDisturbed =
        this.heap[current] > this.heap[leftChildIndex] ||
        this.heap[current] > this.heap[rightChildIndex];

      while (
        this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        beDisturbed
      ) {
        /* 取较小值和current交换 */
        if (this.heap[leftChildIndex] > this.heap[rightChildIndex]) {
          [this.heap[current], this.heap[leftChildIndex]] = [
            this.heap[leftChildIndex],
            this.heap[current],
          ];
          current = leftChildIndex;
        } else {
          [this.heap[current], this.heap[rightChildIndex]] = [
            this.heap[rightChildIndex],
            this.heap[current],
          ];
          current = rightChildIndex;
        }

        /* update leftChildIndex and rightChildIndex*/
        leftChildIndex = 2 * current + 1;
        rightChildIndex = 2 * current + 2;
      }
    }
  }
}
