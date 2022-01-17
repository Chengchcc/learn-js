// 普通递归 爆栈风险
function fib(n){
    if(n == 0) return 1
    if(n == 1) return 1
    return fib(n-1) + fib(n-2)
}

// 尾递归优化
function fib(n, a = 1, b = 1) {
    if(n == 0) return a
    return fib(n-1, b, a+b)
}

// 循环
function fib(n){
    if(n == 0) return 1
    if(n == 1) return 1
    let a = 1, b = 1
    for (let i = 2; i <= n; i++) {
        let c = a + b
        a = b
        b = c
    }
    return b
}

// 记忆化
function fib(n, memo = {}) {
    if(n == 0) return 1
    if(n == 1) return 1
    if(memo[n]) return memo[n]
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
}