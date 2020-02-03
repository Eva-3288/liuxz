// then的用法

let fs = require('fs');

// 目标:要分段读取， 第一个文件的输出，是下一个文件的输入

// fs.readFile('./name.txt','utf8',function(err,data){
//     fs.readFile(data,'utf8',function(err,data){   //第一个参数写data,  是上一个文件的输出
//         console.log(data);
        
//     })
    
// })
// 如上写法的缺点：1.回调嵌套问题，不好维护   2.  如果有err 要在每个函数里嵌套一层：异步错误处理问题，不能统一

// 我们可以写一个方法 把它变成promise
function read(url){
    return new Promise( (resolve , reject) => {     //resolve , reject 这是两个回调，执行器执行完调用其中之一，并传参数：值或原因
        fs.readFile(url,'utf8',function(err,data){   //第一个参数写data,  是上一个文件的输出
            if (err) reject(data);  //如果失败了就调用 方法reject()
            resolve(data);  //否则成功了调用resolve()
            
        })

    }  )
}
// new Promise() 构造一个实例对象，里面的执行器是new 时立即执行，然后根据成功或失败，调用resolve /reject方法改变实例对象的状态，和值或原因

// read('./name.txt').then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法

// },err => {
//     console.log(err);
// })

read('./name.txt').then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法
        console.log(data);
        
    read('./age.txt').then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法
        console.log(data);
        
    },err => {
        console.log(err);
    })
},err => {
    console.log(err);
})

// 如果一个promise的then方法中的函数(成功或失败)返回的结果是一个promise的话，
// 会自动将这个promise执行，并且采用它的状态，如果成功了 会将成功的结果向外层的下一个then 传递

// 也就是说：里面的结果会决定走外层的then方法里的成功 或 失败


read('./name.txt').then( data => {   
    read('./age.txt');   //这里返回的是一个promise，会自动将这个promise执行，
    // 并决定外层的下一个then 走哪个方法      
},err => {
console.log(err);
}).then( data => {   //这里 read() 被我们写成了一个promise 实例 ，它有then方法
    console.log(data);
},err => {
console.log(err);
})
