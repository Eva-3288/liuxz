// express 是wb的高新能的服务端框架,express创建服务非常快；
// nodejs 可以写服务
// 1、先安装 npm install express

// 使用1：引入express
let express = require('express');  
// 使用2:执行express
let app = express();

app.get('/say',function(req,res){   //当浏览器发起get请求，并且路径是/say  就走后面的函数
    let {prod,wd,cb} = req.query;   //获取前端传过来的关键字
    console.log(wd);
    res.end(`${cb}('吃了吗')`);   //服务器返回的内容，返回一个回调函数的执行，里面是这个函数的参数
    
})
// 使用3： 监听端口号，然后去浏览器里看localhost:3000
app.listen(3000);