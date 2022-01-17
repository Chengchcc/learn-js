/**
 * 魔术师手中有一堆扑克牌，观众不知道它的顺序，接下来魔术师：

从牌顶拿出一张牌， 放到桌子上
再从牌顶拿一张牌， 放在手上牌的底部
如此往复（不断重复以上两步），直到魔术师手上的牌全部都放到了桌子上。

此时，桌子上的牌顺序为： (牌顶) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌底)。
 * @param {*} arr
 * @returns
 */
function poke(arr) {
    let i = 1
    let out = []
    while (arr.length) {
        if (i % 2) {
            out.push(arr.shift())
        } else {
            arr.push(arr.shift())
        }
        i++
    }
    return out
}


function reverse(arr) {
    let i = 1
    let out = []
    while (arr.length) {
        if (i % 2) {
            out.unshift(arr.pop())
        } else {
            out.unshift(out.pop())
        }
        i++
    }
    return out
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
var out = poke(arr)
console.log(out)
console.log(reverse(out))