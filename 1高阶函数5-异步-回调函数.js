let fs = require('fs');   //fs 是node的api: file system 文件读写

let school= {};
function out(){
    if( Object.keys(school).length === 2 ){  //Object.keys()用于获得由对象属性名组成的数组
        console.log(school)
    }
}

fs.readFile('./name.txt','utf-8',function(err , data){
    // 参数：文件名、 编码-不支持gbk 、callback-因为node的特点都是异步的
    school.name = data;
    out(); //1.执行完这个方法后，调用out方法
    
}); //读取文件， 默认查找的是 根目录,根路径；
fs.readFile('./age.txt','utf-8',function(err , data){
    school.age = data;
    out(); //2.执行完这个方法后，调用out方法
}); 


//1、首先上面两个方法都是异步的，同时写两个异步方法，谁先执行完不一定：看读取的速度  和 谁先完成
//读两个文件，希望最终拿到一个整体的结果 {name:'lxz',age:18}

// 串行：顶一个走完，再走第二个
// 并行：并发  --这个最合理

// 解决回调的方案：通过回调函数来解决,就是上面的部分；