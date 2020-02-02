// 发布（触发）-emit  、 订阅 -on
// 找一个中介数组，我们订阅方法的时候，把定义的方法存到 中间数组中；发布/触发 的时候直接遍历执行 中介数组中的方法即可
// 发布 和订阅之间没有任何关系，都是各自和中介数组进行联系
let fs = require('fs');

let event = {
    _arr: [],   //这个数组不属于on  或者 emit ,所以发布和订阅之间没有任何关系
    on(fn) {     //fn 是每次执行event.on()方法时传的参数
        this._arr.push(fn);  //让on 绑定的fn 都存到_arr 数组里
    },
    emit() { //emit 发布（触发）的时候，让_arr数组里的方法依次执行
        this._arr.forEach(function (ele) {  //箭头函数 可以写成  fn => fn()
            ele();
        })
    }
}

event.on(function () {    //订阅：这个函数不会立即执行
    console.log('ok');
})
event.on(function () {    //而且 on  可以绑定多个函数,思路：就是把这些函数都存到数组里，到时候依次触发
    if (Object.keys(school).length === 2) {
        console.log(school);
    }
})

let school = {};
fs.readFile('./name.txt', 'utf-8', function (err, data) {
    school.name = data;
    event.emit();  //触发：emit ，emit 方法里写的是触发 _arr里 订阅时候存的方法
    // emit 这个执行的时候，会先执行emit里的方法，然后把on里的方法也执行了
})
fs.readFile('./age.txt', 'utf-8', function (err, data) {
    school.age = data;
    event.emit();  //触发：emit
    // emit 这个执行的时候，会先执行emit里的方法，然后把on里的方法也执行了
})


// > 问题：**观察者模式** 和 **发布订阅模式** 有什么区别？
// > 观察者模式 是基于发布订阅模式的，而且 观察者模式下  发布 和  订阅 是有关系的。==vue就是典型的观察者模式==