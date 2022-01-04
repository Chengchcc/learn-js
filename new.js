function _new(constructor){
    var obj = {};
    obj.__proto__ = constructor.prototype;
    var ret = constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
    return (typeof ret === 'object') ? ret : obj;
}