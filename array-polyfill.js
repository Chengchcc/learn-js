Array.prototype.myForEach = function(callback) {
    if(this == null){
        throw new TypeError('this is null or not defined');
    }
    if(typeof callback !== 'function'){
        throw new TypeError(callback + ' is not a function');
    }
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    for(let i = 0; i < len; i++){
        if(i in O){
            callback.call(thisArg, O[i], i, O);
        }
    }
}

Array.prototype.myMap = function(callback){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    let A = new Array(len);
    for(let i = 0; i < len; i++){
        if(i in O){
            A[i] = callback.call(thisArg, O[i], i, O);
        }
    }
    return A;
}

Array.prototype.myFilter = function(callback){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    let A = new Array();
    for(let i = 0; i < len; i++){
        if(i in O){
            if(callback.call(thisArg, O[i], i, O)){
                A.push(O[i]);
            }
        }
    }
    return A;
}

Array.prototype.myReduce = function(callback, initialValue){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    let k = 0;
    if(initialValue === undefined){
        initialValue = O[0];
        k = 1;
    }
    for(let i = k; i < len; i++){
        if(i in O){
            initialValue = callback.call(thisArg, initialValue, O[i], i, O);
        }
    }
    return initialValue;
}

Array.prototype.mySome = function(callback){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    for(let i = 0; i < len; i++){
        if(i in O){
            if(callback.call(thisArg, O[i], i, O)){
                return true;
            }
        }
    }
    return false;
}


Array.prototype.myEvery = function(callback){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    for(let i = 0; i < len; i++){
        if(i in O){
            if(!callback.call(thisArg, O[i], i, O)){
                return false;
            }
        }
    }
    return true;
}

Array.prototype.myIndexOf = function(searchElement, fromIndex){
    let O = Object(this);
    let len = O.length >>> 0;
    let k = fromIndex | 0;
    if(k < 0){
        k = Math.max(len + k, 0);
    }
    for(let i = k; i < len; i++){
        if(i in O){
            if(O[i] === searchElement){
                return i;
            }
        }
    }
    return -1;
}

Array.prototype.myLastIndexOf = function(searchElement, fromIndex){
    let O = Object(this);
    let len = O.length >>> 0;
    let k = fromIndex | 0;
    if(k < 0){
        k = Math.max(len + k, 0);
    }
    for(let i = k; i >= 0; i--){
        if(i in O){
            if(O[i] === searchElement){
                return i;
            }
        }
    }
    return -1;
}

Array.prototype.myIncludes = function(searchElement, fromIndex){
    let O = Object(this);
    let len = O.length >>> 0;
    let k = fromIndex | 0;
    if(k < 0){
        k = Math.max(len + k, 0);
    }
    for(let i = k; i < len; i++){
        if(i in O){
            if(O[i] === searchElement){
                return true;
            }
        }
    }
    return false;
}

Array.prototype.myFind = function(predicate){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    for(let i = 0; i < len; i++){
        if(i in O){
            if(predicate.call(thisArg, O[i], i, O)){
                return O[i];
            }
        }
    }
    return undefined;
}

Array.prototype.myFindIndex = function(predicate){
    let O = Object(this);
    let len = O.length >>> 0;
    let thisArg = arguments[1];
    for(let i = 0; i < len; i++){
        if(i in O){
            if(predicate.call(thisArg, O[i], i, O)){
                return i;
            }
        }
    }
    return -1;
}


