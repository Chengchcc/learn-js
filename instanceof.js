function _instanceof(L, R) {
    // 判断是否为对象
    if (typeof (L) !== 'object' || L === null) {
        return false
    }
    let proto = L.__proto__;
    let prototype = R.prototype;
    while (proto) {
        if (proto == prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
}

function _typeof(T) {
    const type =  Object.prototype.toString.call(T).slice(8, -1).toLowerCase();
    const map = [
        'number',
        'string',
        'boolean',
        'undefined',
        'function',
        'symbol',
        'bigint',
    ]
    return map.indexOf(type) > -1 ? type : 'object';
}

// _instanceof(new Date(), Date); // true
// _instanceof(new Date(), Object); // true
// _instanceof(new Date(), Function); // false
// _instanceof(new Date(), Number); // false
// _instanceof(new Date(), String); // false
// _instanceof(123, Number); // false
_instanceof(new Number(123), Number); // true
// _instanceof(123, Object); // false