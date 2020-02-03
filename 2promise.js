// promise 有哪些优缺点？
// 优点：1.可以解决异步嵌套的问题； 2.可以解决多个异步并发问题
// 缺点 1.promise 基于回调的(要不停的写函数)  2.promise 无法终止异步

// promise 是承诺的意思，promise是一个类，
// 这个类上有3个状态：等待态(默认)，成功态，失败态；一旦成功了就不能失败，失败了也不能成功

let Promise = require('./2promise实现1.js');   // 引入一个自己写的promise.js
let promise = new Promise( (resolve , reject) => {   //Promise 是一个类，参数传一个函数，这个函数叫做 executor 执行器，执行器会立刻执行
    // 执行器会带有2个参数：resolve -成功 ； reject - 失败
    console.log(1);
    // throw new Error('失败');   //throw 语句抛出一个错误。用于：创建自定义错误
    reject(222)
    // resolve('nihao')
}).then( data => {      //每个promise 实例 都有一个then方法,then方法里有2个参数(方法)：成功后走的逻辑 和 失败后走的逻辑；
    //成功走这部分
    console.log(data);    
}, err => {
    //失败走这部分
    console.log(err,'111');    
})



// promise 特点：
// 1).promise是一个类， 这个类上有3个状态：等待态(默认)，成功态，失败态；一旦成功了就不能失败，失败了也不能成功
// resolve 代表成功； reject 代表失败
// 2). 每个promise 实例 都有一个then方法,then方法里有2个参数(方法)：成功后走的逻辑 和 失败后走的逻辑；
// 3).如果new Promise的时候 报错了， 会变成失败态(抛错也算失败)

