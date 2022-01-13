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
            const res = await Promise.resolve(fn())
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
        return new Promise((resolve, reject) => {
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

const limit = promiseLimit(3)

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


Promise.all([...range(0, 10)].map(x=>limit(async () => {
    console.log(`job ${x} executed`)
    return new Promise(resolve => setTimeout(() => resolve(x), 1000))
})))