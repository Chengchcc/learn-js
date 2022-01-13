function isObject(obj){
    return typeof obj === 'object' && obj !== null;
}


function deepClone(obj1){
    let obj = obj1 instanceof Array ? [] : {};
    for(let key in obj1){
        if(isObject(obj1[key])){
            obj[key] = deepClone(obj1[key])
        }else{
            obj[key] = obj1[key]
        }
    }
    return obj
}