// then的用法

let fs = require('fs');

// 目标:要分段读取， 第一个文件的输出，是下一个文件的输入

// fs.readFile('./name.txt','utf8',function(err,data){
//     fs.readFile(data,'utf8',function(err,data){   //第一个参数写data,  是上一个文件的输出
//         console.log(data);
//     })
// })
// 如上写法的缺点：1.回调嵌套问题，不好维护   2.  如果有err 要在每个函数里嵌套一层：异步错误处理问题，不能统一

// -------------------------------------------------------
// 我们可以写一个方法 把它变成promise
function read(url) {
    return new Promise((resolve, reject) => {     //resolve , reject 这是两个回调，执行器执行完调用其中之一，并传参数：值或原因
        fs.readFile(url, 'utf8', function (err, data) {   //第一个参数写data,  是上一个文件的输出
            if (err) reject(err);  //如果失败了就调用 方法reject()
            resolve(data);  //否则成功了调用resolve()
        })
    })
}
// new Promise() 构造一个实例对象，里面的执行器是new 时立即执行，然后根据成功或失败，调用resolve /reject方法改变实例对象的状态，和值或原因

// read('./name.txt').then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法

// },err => {
//     console.log(err);
// })

// read('./name.txt').then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法
//         console.log(data);

//     read('./age.txt').then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法
//         console.log(data);

//     },err => {
//         console.log(err);
//     })
// },err => {
//     console.log(err);
// })

// -----------------------------------------------------------------------
// 如果一个promise的then方法中的函数(成功或失败)返回的结果是一个promise的话，
// 会自动将这个promise执行，并且采用它的状态，如果成功了 会将成功的结果向外层的下一个then 传递

// 也就是说：里面的结果会决定走外层的then方法里的成功 或 失败


// read('./name.txt').then( data => {   
//     return read(data);   //这里返回的是一个promise，会自动将这个promise执行，要返回，要有return
//     // 并采用它的状态,如果成功了会将成功的结果向外层的 下一个then 传递 
// },err => {
// console.log(err);
// }).then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法
//     console.log(data +'222');  //这里的data是上一个then 返回的数据值
// },err => {
// console.log(err);
// })

read('./name.txt').then(data => {
    return read(data + '111');   //1.这个返回的promise 会走reject,那下一个then 就走onrejected
    console.log(err);
}).then(data => {  
    console.log(data + '222');  
}, err => {
    console.log(err);   //2.  走这里
    return undefined; //3.  如果失败了，走error,返回的是一个普通值，那么会将这个普通值作为下一次的成功结果
    // 或者false等普通值，只要不是promise都可以
}).then(data => {   // 4.  上一个then 失败是返回的undefined,这次就走成功
    console.log(data + '222');  //这里的data是上次返回的undefined
    // 5.  我们希望走完这个then 就不要再走以后的then了，就放一个空的promise，
    // 放值 或者 抛错都会走下面的成功或失败，就只能放promise
    return new Promise( ()=>{})  //5. 终止promise,可以返回一个pending的promise
}, err => {
    console.log(err);
}).then(data => {    //6. 这个then 不会执行了
    console.log(111111111);  
}, err => {
    console.log(2222222);   
})
// 总结：
// 1.只有两种情况会失败:返回一个失败的promise(就是promise的执行器里掉的reject方法参数), 或者 抛出异常错误；
// 2.每次执行promise实例.then()的时候都会返回一个新的promise,这样才可以一直调用.then()，而且是新的，不然返回的同一个promise 成功就不能失败了，失败就不能成功了
// then()里面的onrejected 可以不写，然后写一个.catch(err =>{})到时候有过自己有onrejected 就走自己的onrejected，如果没有就走 .catch()