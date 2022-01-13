function MyPromise(executor) {
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
            self.onResolvedCallbacks.forEach(function (callback) {
                callback();
            });
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCallbacks.forEach(function (callback) {
                callback();
            });
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let then, used;
        try {
            then = x.then;
        } catch (e) {
            return reject(e);
        }
        if (typeof then === 'function') {
            try {
                then.call(x, function (y) {
                    if (used) return;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r)=>{
                    if (used) return;
                    used = true;
                    reject(r);
                });
            } catch (e) {
                if (used) return;
                used = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
    let self = this;
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) { return v };
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) { return r };
    let promise2 = new MyPromise(function (resolve, reject) {
        if (self.status === 'resolved') {
            setTimeout(function () {
                try {
                    let x = onResolved(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (self.status === 'rejected') {
            setTimeout(function () {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onResolved(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
            self.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
    });
    return promise2;
}

MyPromise.prototype.catch = function (onRejected) {
    this.then(null, onRejected);
}

MyPromise.prototype.finally = function (callback) {
    let self = this;
    if (self.status === 'resolved') {
        callback();
    } else if (self.status === 'rejected') {
        callback();
    } else {
        self.onResolvedCallbacks.push(function () {
            callback();
        });
        self.onRejectedCallbacks.push(function () {
            callback();
        });
    }
}


MyPromise.resolve = function (value) {
    return new MyPromise(function (resolve) {
        resolve(value);
    });
}

MyPromise.reject = function (reason) {
    return new MyPromise(function (resolve, reject) {
        reject(reason);
    });
}

MyPromise.all = function (promises) {
    return new MyPromise(function (resolve, reject) {
        let result = [];
        let count = 0;
        promises.forEach(function (promise, index) {
            promise.then(function (value) {
                result[index] = value;
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }, function (reason) {
                reject(reason);
            });
        });
    });
}

MyPromise.race = function (promises) {
    return new MyPromise(function (resolve, reject) {
        promises.forEach(p =>
            MyPromise.resolve(p).then(data => {
                resolve(data)
            }, err => {
                reject(err)
            })
        )
    })
}

MyPromise.allSettled = function (promises) {
    return new MyPromise(function (resolve, reject) {
        let result = [];
        let count = 0;
        promises.forEach(function (promise, index) {
            promise.then(function (value) {
                result[index] = {
                    status: 'fulfilled',
                    value: value
                };
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            }, function (reason) {
                result[index] = {
                    status: 'rejected',
                    reason: reason
                };
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            });
        });
    });
}

MyPromise.any = function (promises) {
    return new MyPromise(function (resolve, reject) {
        let count = 0;
        promises.forEach(function (promise, index) {
            promise.then(function (value) {
                resolve(value);
            }, function (reason) {
                count++;
                if (count === promises.length) {
                    reject(reason);
                }
            });
        });
    });
}


function promiseLimit(concurrency) {
    const queue = []
    let outstanding = 0

    const next = () => {
        outstanding--
        if (outstanding < concurrency && queue.length) {
            dequeue()
        }
    }

    async function run(fn) {
        outstanding++
        try {
            const res = await MyPromise.resolve(fn())
            return res
        } catch (err) {
            throw err
        } finally {
            next()
        }
    }

    function dequeue() {
        const job = queue.shift()
        if (job) {
            run(job.fn).then(job.resolve).catch(job.reject)
        }
    }

    function enqueue(fn) {
        return new MyPromise((resolve, reject) => {
            queue.push({ fn, resolve, reject })
        })
    }

    const generator = (fn) => {
        if (outstanding > concurrency) {
            return enqueue(fn)
        } else {
            return run(fn)
        }
    }

    return generator
}

const limit = promiseLimit(4)

function range(start, end, step = 1) {
    function* gen() {
        let x = start
        while (x < end) {
            yield x += step
        }
    }
    return {
        [Symbol.iterator]: gen
    }
}


MyPromise.all([...range(0, 20)].map(x => limit(async () => {
    console.log(`job ${x} executed`)
    return new MyPromise(resolve => setTimeout(() => resolve(x), 1000))
})))