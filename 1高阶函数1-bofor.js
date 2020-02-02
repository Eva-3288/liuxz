function say() {
	//todo...
	console.log('hello')
}
//拓展函数，不想破环原有的函数，不然别人调用say()，say就被修改了。但还想在函数之前或之后添加一些逻辑

// 这是我们设想的最后实现的方法befor的使用方式

Function.prototype.befor = function (func) {
	//给befor方法一个参数，这个参数就是要执行的逻辑参数
	let that = this;   //最后say 调用befor方法，所以这里this指向say方法。
	// 但是在下面的返回函数里，this指向调用这个函数的对象，在浏览器里是window,不是say,所以这里我们把this的指向存在变量that里
	//这是闭包的私有变量，因为被返回函数使用，所以不会被销毁
	return function () {
		func();       //在返回的参数里，先执行要添加的逻辑
		that();      //然后执行say方法里的逻辑
	}
}

// 上面这个方法里的this问题也可以用es6的箭头函数来写：
// Function.prototype.befor = function (func) {
// 	return () => {
// 		func();       
// 		this();      
// 	}
// }

let newSay = say.befor(function () {
	//让say方法，调用一个方法befor,然后把想要添加的逻辑作为参数传进去,这个方法执行完返回一个函数，这个函数是两个函数的拼接
	console.log('我先执行再say');
})
newSay();

// 我们按照上面的使用方法进行编写
// 我们希望所有的函数都有befor方法，都可以在执行之前先执行别的函数，所以加在Function.prototype