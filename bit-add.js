function add(a,b){
    let sum = a^b;
    let carry = (a&b)<<1;
    while(carry !== 0){
        let temp = sum;
        sum = carry ^ temp;
        carry = (temp&carry)<<1;
    }
    return sum;
}

function subtract(a, b){
    let negate = add(~b, 1)
    return add(a, negate)
}

function multiply(a, b){
    let result = 0
    let shift = 0
    while(b !== 0){
        if(b & 1){
            result = add(result, a << shift)
        }
        b = b >> 1
        shift++
    }
    return result
}

function divide(a, b){
    let result = 0
    let shift = 0
    while(a !== 0){
        if(a & 1){
            result = add(result, b << shift)
        }
        a = a >> 1
        shift++
    }
    return result
}



var  a = 1
console.log(add(1,2))
console.log(subtract(1,2))
console.log(multiply(-3,2))
console.log(subtract(a<<3, a))
