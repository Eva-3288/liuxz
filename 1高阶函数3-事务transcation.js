// react 里的setState就用到了事务的概念
function perform(anyMethod, wrappers) {  //参数传一个函数，任何的方法
    return function () {  //如果不想代码直接执行，就放在一个函数里返回，想执行的时候调用，这又是一个闭包
        wrappers.forEach(wrapper => wrapper.initialize())   //这是添加的bofor功能
        //forEach 的第一项是数组里的每一个元素，wrapper就是个名字，
        //这里是循环完wrappers，每项都执行一次initialize（）
        // 箭头函数只有一个参数，可以省略（）,没有return 可以省略{}
        anyMethod();  //这是核心功能
        wrappers.forEach(wrapper => wrapper.close());  //这是添加的after 功能
    }
}

let newFunc = perform(function () {   //perform,参数时一个函数，返回一个函数； 所以时高阶函数
    console.log('这里是say方法');

}, [  //perform的第二个参数是一个数组，里面每一项都是一个对象，对象里是一层添加的方法
    {  //wrapper1
        initialize() {
            console.log('beforSay1');
        },
        close() {
            console.log('close1');
        }
    }, { //wrapper2
        initialize() {
            console.log('beforSay2');
        },
        close() {
            console.log('close2');
        }
    }
]);
newFunc();