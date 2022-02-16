function deepClone(obj, cache=new WeakMap()){
    if(Object(obj) !== obj) { // primitive value
        return obj
    }
    if(cache.has(obj)){ // cyclic reference
        return cache.get(obj)
    }

    let clonedObj = obj instanceof Date ? new Date(obj):
                    obj instanceof RegExp ? new RegExp(obj.source, obj.flags):
                    obj instanceof Map ? new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)])):
                    obj instanceof Set ? new Set(obj):
                    obj.constructor? new obj.constructor():
                    Object.create(null)
    cache.set(obj, clonedObj)
    return Object.assign(clonedObj, ...Object.keys(obj).map(key => ({[key]: deepClone(obj[key], cache)})))
}