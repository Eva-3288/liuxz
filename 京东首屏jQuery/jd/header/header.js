var requestTimer = null;
$('#searchInput').on('input',function(){    //jquery 没有input方法，绑定事件要用on;不能 $('input').input(function(){})
    var val = $(this).val();   //获取搜索框里的内容
    if(val){  // 搜索框里有值才查找
        clearTimeout(requestTimer);   //每次用定时器前先清理定时器
        requestTimer = setTimeout(function(){    //防抖处理
            getSeatchData(val);  
        },500)
    }
})
//绑定input 事件后，每次输入都会触发ajax请求，网络请求是异步处理的，不一定哪个请求先返回回来； 如果输入第一ge字母的请求，最后才返回回来，那页面渲染的就不是最后输入的请求的结果
// 可能不是 最新的 关键字检索的数据,怎么拿到最新的数据呢，要做一个防抖处理：
// 防抖处理：添加请求延迟，让请求延迟发出，加一个定时器


//回车触发
/* $('#searchInput').keyup(function(e){ 
    if(e.keyCode == 13){
        $('#searchBtn').click();
    }
}) */

$('#searchBtn').click(function(){
    console.log('跳转页面');
})
//请求接口搜索相关数据
function getSeatchData(val){
    $.ajax({
        url:'https://suggest.taobao.com/sug',   //请求的接口
        type:'get',  //请求类型
        data:{   //传递的数据
            area: 'c2c',
            code: 'utf-8',
            q: val,
            callback:'jsonpFunc'   //传一个当前页面里有的一个函数的函数名--是个字符串而不是函数，后台会用这个函数名包裹数据然后返回
        },
        dataType:'jsonp',   //dataType 是 请求者 希望拿到的数据类型，如果这个值是jsonp  那jq 会发出一个jsonp的请求，就不是ajax请求了
        // 这是jq把ajax 和 jsonp 封装到一起了

        // ajax 和 jsonp 是两个独立的概念：
        // ajax 只能在同源下进行网络请求，数据交互，通过页面中创建一个XMLHttprequest对象来完成请求；
        //   jsonp是用来做数据处理的，通过script的src属性来完成引入的；
    })
}
//jsonp 需要的函数
function jsonpFunc(res){
    console.log(res);   //这就是后台返回的数据
    var data = res.result,
        str='';

    data.forEach((item,index) => {
        str += `<li>
                    <a href="#">${item[0]}</a>
                </li>`
    });
    $('.searchList').html(str).show();
}

// jsonp -- 后台返回的数据 给数据json 外面包裹了一层   json and padding
/* 正常的数据格式是json,
包裹一层的作用：jsonp的原理，script标签里的src 引入的资源不受同源限制
我们可以动态的创建script标签，然后把请求的地址（ajax里的url）放在script的src属性里，请求并得到src里的数据后，我们需要在页面里接收

怎么拿到（接收） script里请求来的资源？
jsonp的原理：可以在 传递 url 时候传递一个参数，这个参数作为返回数据的一个包裹层，也就是jsonp 要求我们传递过去的事这样一个字符串：如果我们传的是字符串a,那后台返回的数据是 a(数据)
那script 拿到的数据就是  a(数据) ；script 在html里的作用是  拿到资源 并 执行，所以会执行 a(数据)  ，js 会认为这是一个函数a的执行   -- 所以会要求 页面里 这个 函数a的定义，
 我们就可以在页面定义这个函数的时候，接收后台传来的数据（a 函数的参数）


那这个函数怎么传过去呢，只需要在url里面添加上要给属性，这个属性是后台定义的 */
// --------------------------------------------------------------------

//鼠标移除 搜索结果列表 的时候, 搜索结果列表会延迟消失
var hideTimer = null;
$('.searchList').mouseleave(function(){
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function(){
            $('.searchList').hide()
        },500)
})

$('.logo ').mouseenter(function(){
    $('.logo-img').css({
        // background:'url(https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif)'
        background:'url(https://img1.360buyimg.com/da/jfs/t1/16273/9/11655/153805/5c90a4f3E683206d9/eef283b0ed619fe4.gif?v='+Math.random()+') no-repeat center',
        // gif的图片有动画的时间，执行完后会停在最后一帧，想要每次都有，加一个参数，让我们请求再次发出，加载一个新的gif过来，这个参数后台不做任何处理的
        // 请求再次发出，重新加载图片，参数可以是随机值 也可以是  时间戳

        // gif 如果只加载一次，加载过来会立即执行，执行完停在最后一帧，下次点击是在缓存里取， 我们要再次重新请求，而不是在缓存里取，我们可以改变参数，参数改变后会重新取请求图片
        backgroundSize:'100% 100%',
    })
}).mouseleave(function(){
    setTimeout(function(){
        $('.logo-img').css({
            background:'url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/header/sprite.png)'
        })
    },2000)
})