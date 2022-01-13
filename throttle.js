function throttle(fn, wait, options) {
    options = options || {};
    let timeout, context, arg, result;
    let previous = 0;
    let later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = fn.apply(context, arg);
        if (!timeout) context = arg = null;
    }

    let throttled = function() {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        arg = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = fn.apply(context, arg);
            if (!timeout) context = arg = null;
        }else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    }
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = arg = null;
    }
    return throttled;
}