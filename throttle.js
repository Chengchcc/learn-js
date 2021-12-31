function throttle(fn, wait) {
    let time = Date.now();
    return function(...args) {
        if (Date.now() - time >= wait) {
            fn.apply(this, args);
            time = Date.now();
        }
    }
}