function debounce(fuc, delay, immediate){
    let timer = null;
    function debounced(){
        let args = arguments, ctx = this;
        if(immediate && !timer){
            fuc.apply(ctx, args);
        }
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            fuc.apply(ctx, args);
        }, delay);
    }
    debounced.cancel = function(){
        clearTimeout(timer);
    }
    return debounced;
}