// 继承
function Person(name) {
    this.name = name;
    this.className = "person"
}
Person.prototype.getClassName = function () {
    console.log(this.className)
}

{
    // 原型链继承

    function Man(name) {
    }

    Man.prototype = new Person();//1

}

{
   // 调用构造函数
    function Man(name){
       Person.apply(this, arguments)
    }

}

{
    // 组合继承
    function Man(name) {
        Person.apply(this, arguments)
    }
    //继承原型
    Man.prototype = new Person();
}

{
    // 寄生组合继承
    function Man(name) {
        Person.apply(this, arguments)
    }
    //注意此处, 原型 复制
    Man.prototype = Object.create(Person.prototype);

    Man.prototype.constructor = Man
}