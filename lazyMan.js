function LazyMan1(name) {
    function Man(name) {
        this.tasks = []
        console.log(`Hi I am ${name}`)
        // push init
        this.tasks.push(() => {
            return Promise.resolve()
        })
        this.next();
    }

    Man.prototype.next = function () {
        let task = this.tasks.shift();
        if (task) {
            task().then(() => {
                this.next();
            });
        }
    }

    Man.prototype.eat = function (name) {
        this.tasks.push(() => {
            return new Promise((resolve) => {
                console.log(`I am eating ${name}`);
                resolve()
            })
        })
        return this;
    }

    Man.prototype.sleep = function (time) {
        this.tasks.push(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // console.log(`I am sleeping ${time}`);
                    resolve()
                }, time * 1000)
            })
        })
        return this
    }

    Man.prototype.sleepFirst = function (time) {
        this.tasks.unshift(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // console.log(`I am sleeping ${time}`);
                    resolve()
                }, time * 1000)
            })
        })
        return this
    }

    return new Man(name)
}

function LazyMan(name) {
    const actions = {
        queue: [{ log: `Hi I am ${name}` }],
        sleep: function (time) {
            this.queue.push({ time })
            return this
        },
        sleepFirst: function (time) {
            this.queue.unshift({ time })
            return this
        },
        eat: function (name) {
            this.queue.push({ log: `I am eating ${name}` })
            return this
        },
        [Symbol.iterator]: function * () {
            while (this.queue.length) {
                const queue = this.queue.shift()
                const { log, time } = queue
                console.log(queue)
                yield new Promise(resolve => {
                    setTimeout(() => {
                        resolve(log)
                    }, time*1000)
                })
            }
        }
    }

    async function run() {
        for await (const log of actions) {
            if(log){
                console.log(log)
            }
        }
    }

    run()

    return actions
}


// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food