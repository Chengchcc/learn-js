function debounce(fn, wait, immediate) {
    let timeout, result
    let debounced = function(){
        const context =this
        const args = arguments
        if(timeout){
            clearTimeout(timeout)
        }
        if(immediate){
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if(callNow){
                result = fn.apply(context, args)
            }
        }else {
            timeout = setTimeout(() => {
                result = fn.apply(context, args)
            }, wait)
        }
        return result
    }
    debounced.cancel = function(){
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}