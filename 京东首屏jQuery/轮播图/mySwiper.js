/*  
轮播图需要传递的参数：
    1. 轮播的内容  ---》 dom节点列表
    2. 动画效果  ----》 type : 'animate' , 'fade'
    3. 是否自动轮播 ---》 
    4. 是否显示左右按钮
    5. 是否显示小圆点
    6. 自动轮播时间
    7. 每一次轮播对象的大小  width height
    8. 自动轮播方向
 */
/* 使用：
$('.wrapper').swiper({
    list: $('.item'),     //传的这是dom节点列表
    type: 'fade',
    isAuto: true,
    showChangeBtn: true,
    showSpotBtn: true,
    autoTime: 3000,
    width: 300,
    height: 250,
    direction: 'right'
  }) */

  //-------------封装-----------
  (function(){    //为了插件里的变量不污染全局变量，我们把代码写到立即执行函数里，形成闭包
    
    // $.extend({    //$.extend({}) 是工具方法，是给jquery对象添加方法，调用方法的时候：$.方法（）

    //  })
    function Swiper(options,wrapper){   //声明一个轮播图对象的构造函数，在这个构造函数里保存轮播图的数据
        this.list = options.list || [];   //兼容处理，如果没有传就给一个空数组
        this.num = this.list.length;
        this.curIndex = 0;
        this.lock=false;  //加锁，默认是没锁的，当animate 动画点击的时候，点的太快就加锁，执行完动画才能执行新的点击事件里的代码
        this.type = options.type || 'fadeIn';
        this.isAuto = options.isAuto == undefined ? true : options.isAuto; //options.isAuto的值是布尔值 
        this.showChangeBtn = options.showChangeBtn == undefined ? true : options.showChangeBtn;
        this.showSpotBtn = options.showSpotBtn == undefined ? true : options.showSpotBtn;
        this.autoTime = options.autoTime || 3000;
        this.width = options.width || $(wrapper).width();     //如果没有传宽度就用他父级的宽度
        this.height = options.height || $(wrapper).height();  
        // 我们会创建一个轮播图结构，然后插入到父级，每个轮播图的父级也不同，所以我们要保存一下父级
        this.wrapper = wrapper || $('body');   //如果传了父级就存父级，没存的话就用body
        this.direction = options.direction || 'right' ;
        this.timer = null; //自动轮播时的定时器

        // 上面我们保存了所有的轮播图信息，然后需要写方法来创建轮播图结构--
        // 创建结构的方法，可以写在构造函数里，也可以写在构造函数的原型链上，区别在于：
        // 每次创建轮播图对象的时候，所有存储轮播图数据的对象，对象都要占据一定空间的：属性相当于变量，写在构造函数里相当于每个轮播图对象里都存储了方法，
        // 如果写在构造函数的原型链上 就只需要一个空间来存储，优点：不需要给每个new 出来的对象都单独开辟存方法的空间
        this.init = function(){
            this.createDom();   //在构造函数里调用原型链上的方法
            this.initStyle();
            this.bindEvent();
            if(this.isAuto){
                this.autoChange();  //自动轮播
            }
        }
    }
    // 为了减少冗余，提高空间利用率，建议我们把方法写在原型链上,然后在构造函数里写方法调用
    Swiper.prototype.createDom = function(){
        
        //1. 创建轮播图结构
        var mySwiperBox = $("<div class='my-create-swiper-box'></div>");   //创建一个div
        var mySwiperUl = $("<ul class='my-create-swiper-ul'></ul>");
        var mySwiperSpotsBox= $("<div class='my-create-swiper-spots'></div>");
        // 插入轮播内容，轮播内容是传进来的list里的每个数据
        for(var i = 0; i < this.list.length;i++){
            var item = this.list[i];
            //创建li标签，然后插入内容,item是dom节点
            $("<li class='my-create-swiper-li'></li>").append($(item))
                                                      .appendTo(mySwiperUl);
            
            $("<span></span>").appendTo(mySwiperSpotsBox);
        }
        if(this.type =='animate'){   //如果是滑动效果，要在末尾多加一个第一张
            $("<li class='my-create-swiper-li'></li>").append($(this.list[0]).clone(true))
            .appendTo(mySwiperUl);
        }

        //2. 插入
        mySwiperBox .append(mySwiperUl)       //插入轮播图结构
                    .append(mySwiperSpotsBox)   //插入小圆点
                    .append( $("<div class='my-create-swiper-btn my-create-swiper-leftbtn'>&lt;</div>") )
                    .append( $("<div class='my-create-swiper-btn my-create-swiper-rightbtn'>&gt;</div>") )
                    .appendTo(this.wrapper)   //插入到父级框架里
                    .addClass('my-swiper-'+this.type)   //根据不同的动画效果添加不同的类名
    }

    // 初始化样式：如果页面中引入了多个轮播图，要保证每个轮播图js设置的样式是互相独立的，不然后面的会覆盖前面的样式
    // $('<div></div>',this.wrapper).css({ });   //这样写，在用$选择元素是，第二个参数是样式作用的作用域，就是只在this.wrapper里有效
    Swiper.prototype.initStyle = function(){
        if(this.type == 'animate'){
            $('.my-create-swiper-ul',this.wrapper).css({    //滑动的时候，ul的宽度是li宽度的和
                width:(this.num +1 ) * this.width   //无缝轮播是在最后一张图的后面多加一个第一张图
            }).find('.my-create-swiper-li').css({    //这只每个li项宽高为传进来的宽高
                width:this.width,
                height:this.height
            })
        }
        // 根据传入值确定左右按钮 和  小圆点是否显示
        if(!this.showChangeBtn){
            $('.my-create-swiper-btn',this.wrapper).hide();
        }
        if(! this.showSpotBtn){
            $('.my-create-swiper-spots',this.wrapper).hide();  //处理样式的时候添加作用域，只在当前包裹层里处理样式，不影响别的轮播图
        }
        $('.my-create-swiper-spots > span',this.wrapper).eq(this.curIndex).addClass('active');   //小圆点显示当前选中项
        if(this.type == 'fadeIn'){    //淡入淡出效果所以的都消失，只显示当前
            $('.my-create-swiper-li',this.wrapper).hide().eq(this.curIndex).show();
        }
    }
    
    Swiper.prototype.bindEvent = function(){
        let that = this;  //保存轮播图对象
        $('.my-create-swiper-box',this.wrapper).mouseenter(function(){   //鼠标移入的时候，自动轮播停止
            clearInterval(that.timer);
        }).mouseleave(function(){  //鼠标移出，如果是自动轮播，再调用自动轮播函数
            if(that.isAuto){
                that.autoChange();
            }
        })

        $('.my-create-swiper-leftbtn',this.wrapper).click(function(e){   //点左按钮
            // 点击的时候先判断下有锁没锁
            if(that.lock){  //锁上了 就先不执行这个点击事件里的代码
                return false;
            }
            that.lock = true;   //进来先上锁 ，然后执行代码，等轮播动画执行完 把锁去掉，轮播没切换完就有锁，下次快速点击也不会执行这里的代码

            // 在这里面this改变了，指向当前的调用click的元素，左按钮--dom节点
            // 原生js里用bind改变this指向，jq里bind代表绑定事件，而且JQ3.x里没有bind
           if(that.type == 'fadeIn' && that.curIndex == 0){
               that.curIndex = that.num -1;
           }else if(that.type == 'animate' && that.curIndex == 0){
                $('.my-create-swiper-ul',that.wrapper).css({left:-that.num * that.width});
                that.curIndex = that.num -1;
           }else{
               that.curIndex -- ;
           }
           //上面是点击后获得当前显示项，然后还要切换录播
            that.changeItem();   //切换内容选项，动画形式 ，
            
        })

        $('.my-create-swiper-rightbtn',this.wrapper).click(function(e){   //点右按钮
            if(that.lock){  //锁上了 就先不执行这个点击事件里的代码
                return false;
            }
            that.lock = true;
          //animate滑动的时候，要做无缝衔接，判断和淡入不同
            if(that.type == 'fadeIn' && that.curIndex == that.num -1){  //如果是淡入淡出  且  点击的是视觉上的最后一个，那让curIndex 变第一个0
               that.curIndex = 0;
           }else if(that.type == 'animate' && that.curIndex == that.num){   //如果是animate  且点击的是我们添加了那一个复制的第一项
            $('.my-create-swiper-ul',that.wrapper).css({left:0});    //ul的left变成0,瞬间变成第一张的位置, 用css  不要用animate  
            that.curIndex = 1;
           }else{
               that.curIndex ++ ;
           }
           //上面是点击后获得当前显示项，然后还要切换录播
            that.changeItem();   //切换内容选项，动画形式
            
        })

        $('.my-create-swiper-spots > span',this.wrapper).mouseenter(function(){  //鼠标移入小圆点mouseenter
            if(that.lock){  //锁上了 就先不执行这个点击事件里的代码
                return false;
            }
            that.lock = true;
            // console.log($(this).index());  //点击列表里的某一项， $('.item).index()  获取点击项的索引值
            that.curIndex = $(this).index();
            that.changeItem();
            
            
        })
    }
    Swiper.prototype.changeItem = function(index){   //切换轮播
        var that = this;
        if(this.type == 'fadeIn'){    //淡入淡出
            $('.my-create-swiper-li',this.wrapper).fadeOut().eq(this.curIndex).fadeIn(function(){
                //这里也是动画执行完后的回调
                that.lock = false;
            });
        }else if(this.type == 'animate'){
            var leftdistance = this.curIndex * this.width;
            $('.my-create-swiper-ul',this.wrapper).animate({left:-leftdistance},function(){   // animate动画执行完的回调函数
                //这个回调函数里this指向调用方法的jquery对象
                that.lock = false;  //动画执行完，把锁去掉
            })  //一定要写作用域,  1-2切换是ul 向左走，left 为负
        }
        // 淡入淡出正常处理，但animate的时候图片his.curIndex是 0 1 2 3 4（总是多一个，这是复制的0）  而小圆点是 0 1 2 3 ，我们可以让this.curIndex % this.num  这样区域后 变成 0 1 2 3 0   和 0 1 2 3  是对应的
        $('.my-create-swiper-spots > span',this.wrapper).removeClass('active').eq(this.curIndex % this.num).addClass('active');   //改变小圆点的显示状态
    }
    Swiper.prototype.autoChange = function(){
        var that = this;
        this.timer = setInterval(function(){   //自动轮播可以隔一段时间取手动的点击下左右按钮，
            //定时器里的this指向时指向window的
            if(that.direction == 'right'){
                $('.my-create-swiper-rightbtn',that.wrapper).click();  //触发有按钮的点击事件
            }else{
                $('.my-create-swiper-leftbtn',that.wrapper).click(); 
            }
        },this.autoTime)  //时间是我们传递的
    }
    $.fn.extend({  // 这是实例方法，是给jq dom节点添加的方法，fn 是prototype ,也就是在jquery的原型链上拓展的方法，那生产的jquery实例也可以调用这个方法
        // 调用的时候 $('.class').方法（）   --实例调用方法
        swiper:function(options){    //调用的时候传递一个对象，定义的时候接收这个对象参数
            //每一个轮播图相互之间独立，我们要给每个轮播图开辟出一个单独的空间，保存自己独立的数据
            // 给每个轮播图生产一个单独的轮播图对象，存储数据 ： 如何创建不同的相互独立的轮播图对象？ --通过new 构造函数的形式，通过构造函数里的this
            // 注意：构造函数里的this，指向当前实例； 而拓展方法swiper里的this 指向调用这个方法的jquery实例

            // 创建一个轮播图对象：
            var obj = new Swiper(options , this);   //new出来的对象都是相互独立的，参数options 把所有的数据传递进去
            //第二个参数this 是调用这个方法swiper的jquery实例，也就是轮播图外面的包裹层
            obj.init();    //new 完对象后，要执行一下初始化方法
        }
    })

  })()