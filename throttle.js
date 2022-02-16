function throttle(func, wait){
    let preTime = Date.now()
    let timer = null
    return function(){
        let ctx = this, args = arguments;
        let remaining = wait - (Date.now() - preTime)
        clearTimeout(timer)
        if(remaining <= 0){
            func.apply(ctx, args);
            preTime = Date.now();
        }else{
            timer = setTimeout(function(){
                func.apply(ctx, args);
            }, remaining)
        }
    }
}