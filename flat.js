function flat(arr, deep = 1){
    let ret = []
    if(deep > 0){
        arr.forEach(item => {
            if(Array.isArray(item)){
                ret.push(...flat(item, deep - 1))
            }else{
                ret.push(item)
            }
        })
    }else {
        ret = arr
    }
    return ret
}


const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
console.log(flat(arr, Infinity))