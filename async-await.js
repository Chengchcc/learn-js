// 手写async await
// 大致思路是 async -> generator

function asyncToGenerator(func){
    return function(){
        const gen = func.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function step(key, arg){
                let info
                try {
                    info = gen[key](arg)
                } catch(err){
                    // 如果不是generator的错误，直接reject
                    return  reject(err)
                }
                if(info.done){
                    resolve(info.value)
                }else{
                    return Promise.resolve(info.value).then(value => {
                        step('next', value)
                    }, err => {
                        step('throw', err)
                    })
                }
            }
            step('next')
        })
    }
}



const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

function* testG() {
    // await被编译成了yield
    const data = yield getData()
    console.log('data: ', data);
    const data2 = yield getData()
    console.log('data2: ', data2);
    return 'success'
}

var test = asyncToGenerator(
    function* testG() {
        // await被编译成了yield
        const data = yield getData()
        console.log('data: ', data);
        const data2 = yield getData()
        console.log('data2: ', data2);
        return 'success'
    }
)

test().then(res => console.log(res))