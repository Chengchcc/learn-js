function _parseInt(str, radix = 10) {
    if (typeof str !== 'string') {
        return NaN
    }

    if (radix < 2 || radix > 36) {
        return NaN
    }

    const group = '0123456789abcdefghijklmnopqrstuvwxyz'

    const flagRegex = new RegExp(`^\s*([+-])`)
    const hexRegex = new RegExp(`^\s*[+-]?0x`)
    if (!!str.match(hexRegex) && arguments.length < 2) {
        radix = 16
    }

    const numRegex = new RegExp(`^\s*[+-]?${radix == 16 ? '(?:0x)' : ''}([${group.substring(0, radix)}]+)`, 'i')
    let flagMatch = str.match(flagRegex)
    let flag = 1
    if (flagMatch) {
        flag = flagMatch[1] === '+' ? 1 : -1
    }

    const numMatch = str.match(numRegex)
    if (!numMatch) {
        return NaN
    }
    const arr = numMatch[1].split('')
    let muk = 1
    return flag * arr.reduceRight((pre, curr) => {
        let ret = pre + group.indexOf(curr) * muk
        muk *= radix
        return ret
    }, 0)
}

console.log(_parseInt('12'))
console.log(_parseInt('0x12', 16))
console.log(_parseInt('0xaf'), parseInt('0xaf'))
console.log(_parseInt('-0x12', 16))
console.log(_parseInt('-12'))