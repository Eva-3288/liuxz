let fs = require('fs');

fs.readFile('./name.txt', 'utf-8', function (err, data) {
    out('name', data); //1.执行完这个方法后，调用out方法
});
fs.readFile('./age.txt', 'utf-8', function (err, data) {
    out('age', data); //2.执行完这个方法后，调用out方法
});

function after(times, callback) {
    let school = {};  //在这里定义，在闭包里 永远不会被销毁
    return function (key, value) {    //这个就是 out
        //school的定义不能写在这里，不然每次执行out school都被清空了；
        school[key] = value;  //往对象里村数据，操作的形参-函数定义部分
        if (--times == 0) {   //当执行王足够的次数，执行回调
            callback(school);  //执行回调，这里的参数是实参，实际要操作的 实参
        }
    }
}
let out = after(2, function (result) {  // 几次后  ， 执行什么操作 这里function 是定义回调，里面的参数是形参
    console.log(result);  //打印结果， 操作形参
})