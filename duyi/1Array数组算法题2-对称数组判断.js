/*
	3、判断数组是否为对称数组，对称数组形式如：[a, b, c, b, a]、[a, b, c, c, b, a] 
	李经理、王中王、手拉手、面对面、上海自来水来自海上
	*/

var arr1 = ['a', 'b', 'c', 'd', 'c', 'b', 'a'];
var arr2 = ['a', 'b', 'c', 'c', 'b', 'a'];
var arr3 = ['a', 'b', 'c', 'a', 'b', 'c'];

// 方案1：-------------------
// 思路：我们新建一个数组的**倒叙数组**，如果**倒叙数组的[i] == 原数组的[i]**，那这个数组是对称的；

/* function symmetry(arr){   //把数组arr放到一个新数组中，因为数组是引用值，所以直接赋值是不行的，操作的时候都会改变
	var newArr=[];
	for(var i=arr.length-1;i>=0;i--){   //倒序取数，这样直接得到倒序的数组
		newArr.push(arr[i]);  //我们遍历每一项然后手动放到数组里
}

for(var i=0;i<arr.length;i++){   
	if(arr[i]!=newArr[i]){   //进行比较
		return false;   //如果不等就跳出循环，返回false
		
	}
}
return true;  //没有不等的就是对称数组，返回true
} */

//-------------------------------------------------------
// 方案2：

// 思路：依次判断数组的首位对称项 是都相同
/* function symmetry(arr) {
	var start = 0;
	var end = arr.length - 1;

	for (var i = 0; i < arr.length; i++) {  //其实这里可以写 middle + 1,这样写其实是多循环判断了一半
		if (arr[start] != arr[end]) {   //依次判断数组的首尾对称项，如果不等就不对称
			return false;
		}
		start++;  //判断完一次，就给首位下表+1 / -1； 然后进行下一次循环对比判断
		end--;
	}
	return true;
} */

//------------------------------------------
// 方案3：

// 思路：方案2里会多走一半次数的循环，这里改为`while循环`，但是终止循环的条件是：start >= end，这个条件不能当作跳出条件，否则循环一次都走不了

function symmetry(arr) {
	var start = 0;
	var end = arr.length - 1;

	while (true) {  //【 1.】 这这个循环一直执行
		/*
			1、这里分别处理了奇数与偶数的情况
			2、如果为奇数的话，start与end相等的时候，就已经找到最后一个了。如果再走一次，start就大于end了。此时就要跳出循环了（当前那次还要走，过了当前那就不能再走了）
			3、如果为偶数的话，start与end挨着的时候，就已经找到最后一个了。如果再走一次，start就等于end了。此时就要跳出循环了 
		*/
		if (start >= end) {   //注意：这里是start >= end，当数组奇数位数时，start = end时符合条件，等下一次start>end的时候跳出；偶数位时，start<end且挨着时符合条件，等下一次start=end时跳出
			break;   //直接跳出循环  【2.】  当满足条件时，跳出循环
		}
		if (arr[start] != arr[end]) {  //如果不等的话，就不对称，返回false 并跳出循环
			return false;
		}
		start++;
		end--;
	}
	return true;  //没有不等的情况，就对称
}


//symmetry(arr1);
console.log(
	symmetry(arr1),	//true
	symmetry(arr2),	//true
	symmetry(arr3),	//false
);