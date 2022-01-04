/**
 * 冒泡排序 o(n^2)
 * @param {Array} array
 */
function bubbleSort(array){
    let len = array.length
    for(let i = 0;i<len;i++){
        for (let j = i; j < len; j++){
            if(array[i]<array[j]){
                [array[i], array[j]] = [array[j], array[i]]
            }
        }
    }
    return array
}

console.log(bubbleSort([6, 1, 2, 4, 3, 5]))

/**
 *
 * 选择排序 o(n^2)
 * @param {*} array
 * @return {*}
 */
function selectSort(array){
    let len = array.length
    for(let i = 0; i< len-1; i++){
        let max = i
        for(let j = i+1; j<len; j++){
            if (array[j] > array[max]){
                max = j
            }
        }
        [array[i], array[max]] = [array[max], array[i]]
    }
    return array
}

console.log(selectSort([6, 1, 2, 4, 3, 5]))

/**
 * 快速排序 o(n*log(n))
 * @param {*} array
 * @returns
 */
function quickSort(array){
    if(array.length <= 1){
        return array
    }
    let pivot = array[0]
    let left = []
    let right = []
    for(let i = 1; i<array.length; i++){
        if(array[i] > pivot){
            left.push(array[i])
        }else{
            right.push(array[i])
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
}

console.log(quickSort([6, 1, 2, 4, 3, 5]))

/**
 *  插入排序 o(n^2)
 * @param {*} array
 * @returns
 */
function insertSort(array){
    let len = array.length
    for(let i = 1; i<len; i++){
        let current = array[i]
        let preIndex = i-1
        while(preIndex >= 0 && array[preIndex] < current){
            array[preIndex+1] = array[preIndex]
            preIndex--
        }
        array[preIndex+1] = current
    }
    return array
}

console.log(insertSort([6, 1, 2, 4, 3, 5]))

/**
 *  堆排序 o(n*log(n))
 * @param {*} array
 * @returns
 */
function heapSort(array){
    function Heap(compareFn){
        this.arr = []
        this.size = 0
        this.compareFn = compareFn || ((a, b) => a - b)
    }

    Heap.prototype.push = function(val){
        this.arr[this.size] = val
        this.size++
        this.shiftUp(this.size - 1)
    }

    Heap.prototype.pop = function(){
        let ret = this.arr[0]
        this.arr[0] = this.arr[this.size - 1]
        this.size--
        this.shiftDown(0)
        return ret
    }

    Heap.prototype.shiftUp= function(index){
        if(index <= 0) return
        let parentIndex = (index - 1) >> 1
        if(this.compareFn(this.arr[parentIndex], this.arr[index]) > 0){
            [this.arr[parentIndex], this.arr[index]] = [this.arr[index], this.arr[parentIndex]]
            this.shiftUp(parentIndex)
        }

    }

    Heap.prototype.shiftDown = function(index){
        let leftIndex = index * 2 + 1
        let rightIndex = index * 2 + 2
        if(leftIndex >= this.size){
            return
        }
        let minIndex = leftIndex
        if(rightIndex < this.size && this.compareFn(this.arr[rightIndex], this.arr[leftIndex]) < 0){
            minIndex = rightIndex
        }
        if(this.compareFn(this.arr[index], this.arr[minIndex]) > 0){
            [this.arr[index], this.arr[minIndex]] = [this.arr[minIndex], this.arr[index]]
            this.shiftDown(minIndex)
        }
    }

    Heap.prototype.peek = function(){
        return this.arr[0]
    }

    let heap = new Heap((a, b) => b-a)
    for(let i = 0; i<array.length; i++){
        heap.push(array[i])
    }
    let ret = []
    for(let i = 0; i<array.length; i++){
        ret.push(heap.pop())
    }
    return ret
}

console.log(heapSort([6, 1, 2, 4, 3, 5]))

/**
 * 归并排序 o(n*log(n))
 * @param {*} array
 * @returns
 */
function mergeSort(array){
    function merge(left, right){
        let l = 0, r= 0;
        let ret = []
        while(l < left.length && r < right.length){
            if(left[l] > right[r]){
                ret.push(left[l++])
            }else{
                ret.push(right[r++])
            }
        }
        ret = ret.concat(left.slice(l)).concat(right.slice(r))
        return ret
    }

    function _mergeSort(array){
        if(array.length <= 1){
            return array
        }
        let mid = Math.floor(array.length / 2)
        let left = array.slice(0, mid)
        let right = array.slice(mid)
        return merge(_mergeSort(left), _mergeSort(right))
    }

    return _mergeSort(array)
}

console.log(mergeSort([6, 1, 2, 4, 3, 5]))

/**
 * 希尔排序 o(n*log(n))
 * @param {*} array
 * @returns
 */
function shellSort(array){
    let len = array.length
    let gap = Math.floor(len / 2)
    while(gap > 0){
        for (let i = gap; i < len; i++){
            let current = array[i]
            let preIndex = i - gap
            while(preIndex >= 0 && array[preIndex] < current){
                array[preIndex + gap] = array[preIndex]
                preIndex -= gap
            }
            array[preIndex + gap] = current
        }
        gap = Math.floor(gap / 2)
    }
    return array
}

console.log(shellSort([6, 1, 2, 4, 3, 5]))

/**
 * 桶排序 o(n+k)
 * @param {*} array
 * @returns
 */
function bucketSort(array){
    let minVal, maxVal
    for(let i = 0; i<array.length; i++){
        if(!minVal || array[i] < minVal){
            minVal = array[i]
        }
        if(!maxVal || array[i] > maxVal){
            maxVal = array[i]
        }
    }
    let bucketSize = Math.floor((maxVal - minVal) / array.length) + 1
    let bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1
    let buckets = new Array(bucketCount)
    for(let i = 0; i<bucketCount; i++){
        buckets[i] = []
    }
    for(let i = 0; i < array.length; i++){
        let index = Math.floor((array[i] - minVal) / bucketSize)
        buckets[index].push(array[i])
    }
    let ret = []
    for (let i = bucketCount -1 ; i >= 0; i--){
        ret = ret.concat(quickSort(buckets[i]))
    }
    return ret
}

console.log(bucketSort([6, 1, 2, 4, 3, 5]))


