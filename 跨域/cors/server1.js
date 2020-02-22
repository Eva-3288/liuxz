let express = require('express');
let app = express();
app.use(express.static(__dirname));    //以当前的目录作为静态文件目录
// http://localhost:5500/index.html  页面中输入它就指向当前目录/index.html

app.listen(5500);