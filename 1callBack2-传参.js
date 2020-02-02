function say(who) { //1.这里有个参数:形参
	//todo...
	console.log(who + ' hello')
}

Function.prototype.befor = function (func) {
	// ...args 剩余运算符：将所有的参数组合成一个数组，只能在最后一个参数里使用
	return (...args) => {    //3.执行逻辑时，获取实参并进行处理， 这个返回的函数，就是最后赋值给newSay的函数
	//如果不是箭头函数，可以直接用arguments 来获取实参列表，但是箭头函数没有arguments	
	//当然如果知道有几个参数，也可以写死
		func();
		this(...args);      //展开运算符
	}
}

let newSay = say.befor(function () {
	console.log('我先执行再say');
})
newSay('lxz');  // 2.实参：say 没有单独调用执行，而是在这里调用执行的，所以实参应该写在这里 

// 什么叫闭包？ 有一个函数，这个函数可以不在当前作用域下执行，可以在外面执行，并且可以拿到之前作用域的值；
// 作用域什么时候产生的？作用域的产生是 根据函数定义的位置，函数执行的时候是执行上下文

// vue 2.0 也会用到 函数劫持（AOP切片）的思想
[1,2,3].push(4);   //我们希望 在调用push方法的时候，触发一句更新操作。相当于我们把push方法重写了
let oldPush = Array.prototype.push;  // 拿到老的push方法
// Array.prototype.push 放在原型上会好用些
function push(...args){   //我们自己写一个push方法,但是这样写我们调用方法就只能 push()；  
	// 本来应该写形参a,但是不知道有多少个参数，所以可以把参数放到一个数组里，利用剩余运算符，转为数组 ...args
	//传的是4，5，6 ； 也就是...args 是4，5，6；那args是[4,5,6]
	// 不能用 xx.push()这样调用了，那push里的this不能用了，我们要用this可以用call /apply
	console.log('数据更新了')
	oldPush.call(this,...args);   //在这里调用原来的push， 这里是展开运算符
	// 但是 oldPush() 这样写，oldPush里的this并不是指向数组，还需要通过call来改变this指向
	//因为 oldPush 也就是 Array.prototype.push 里面的实现也用到了this,所以要用call改变this指向
}
let arr = [1,2,3];
push.call(arr,4,5,6)  //[1,2,3]第一个参数改变push里的this指向，后面的都是参数，我们用arguments 或者 ...args 剩余运算符获取
// call的特点：1.改变this指向  1.可以让push方法执行
// 4,5,6 是实参，有实参就要在定义的地方写下形参 -1实参
console.log(arr);

