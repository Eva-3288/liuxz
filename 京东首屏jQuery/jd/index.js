$('#shortcut').load('./shortcut/index.html');
// 选中元素，然后用load方法加载部分html,使用load 后在浏览器直接打开会报错，
// load代表的是网络请求，网络请求只可以在同源下才能请求：协议，域名，端口都相同
// load的底层原理是ajax，通过load可以引入所有的文件html,css，js等

// 下载插件live Server 后在服务下打开
$('#header').load('./header/header.html')