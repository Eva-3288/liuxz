$('#searchBtn').click(function(){
    
    var val = $('#searchInput').val();   //获取搜索框里的内容
    if(val){  // 搜索框里有值才查找
        alert(val)
        $.ajax({
            url:'https://suggest.taobao.com/sug',   //请求的接口
            type:'get',  //请求类型
            data:{   //传递的数据
                area: 'c2c',
                code: 'utf-8',
                q: val,
                callback:'jsonpFunc'   //传一个当前页面里有的一个函数的函数名，后台会用这个函数名包裹数据然后返回
            },
            dataType:'jsonp',   //dataType 是 请求者 希望拿到的数据类型，如果这个值是jsonp  那jq 会发出一个jsonp的请求，就不是ajax请求了
            // 这是jq把ajax 和 jsonp 封装到一起了

            // ajax 和 jsonp 是两个独立的概念：
            // ajax 只能在同源下进行网络请求，数据交互，通过页面中创建一个XMLHttprequest对象来完成请求；
            //   jsonp是用来做数据处理的，通过script的src属性来完成引入的；
        })
    }
})

function jsonpFunc(res){
    console.log(res);   //这就是后台返回的数据
    
}
// jsonp -- 后台返回的数据 给数据json 外面包裹了一层   json and padding
/*   */



