Function.prototype.myCall = function(ctx, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('Function.prototype.call: ' + this + ' is not a function');
    }
    ctx = ctx || window;
    const fn = Symbol()
    ctx[fn] = this;
    let result = ctx.fn(...args);
    delete ctx[fn];
    return result;
}

Function.prototype.myApply = function(ctx, args){
    if(typeof this !== 'function'){
        throw new TypeError('Function.prototype.apply: ' + this + ' is not a function');
    }
    ctx = ctx || window;
    const fn = Symbol()
    ctx[fn] = this;
    let result = ctx.fn(...args);
    delete ctx[fn];
    return result;
}

Function.prototype.myBind = function(ctx, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('Function.prototype.bind: ' + this + ' is not a function');
    }
    let self = this;
    return function(...args2){
        return self.apply(ctx, [...args, ...args2]);
    }
}