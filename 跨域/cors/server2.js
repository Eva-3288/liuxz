let express = require('express');
let app = express();
app.get('/getData',function(req,res){   //如果get请求这个地址，返回的数据
    console.log(res.headers);
    
    res.end('返回数据：吃了吗')   //返回的数据
})
app.use(express.static(__dirname));    //以当前的目录作为静态文件目录
// http://localhost:5500/index.html  页面中输入它就指向当前目录/index.html

app.listen(4000);