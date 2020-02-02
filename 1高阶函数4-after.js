function after(times, callback) {  //这是一个闭包，它的参数在返回的函数中有用到，它的执行期上下文AO对象永远不会被销毁
    //AO{times:3;} 
    //高阶函数的应用：times 永远被保存在作用域里；
    return function () {    //newFunc ,并且它不在这里执行，这定义它的作用域的外面执行，且能拿到外面的变量
        if (--times === 0) {   //--times  就是times -= 1   就是 times = times -1 
            // 这里先计算times = times-1 然后将减后的times 和 0 做比较
            callback();
        }
    }
}

let newFunc = after(3, function () {    //after的第一个参数是这个函数调用3次后，才会执行后面的回调函数
    //after的参数传要真正执行的函数
    console.log('真正执行的函数');

})
newFunc();
newFunc();
newFunc();
// 要函数执行3次后，才调用回调函数，必须把3次这个times 利用闭包，保证其不会被销毁，不然每次调用完被销毁了，那下次调用还是从3开始算；
// 这个函数，只有第3次执行，超过了也不执行