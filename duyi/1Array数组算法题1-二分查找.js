// 数组面试题 - 前端数组必会算法题

// 1. 字符串反转 '123abc' -> 'cba321'
// 思路：字符串转数组split()，利用数组逆反方法reverse()然后再数组转字符串join()
var str = '123abc'
console.log(str.split('').reverse().join(''));

// -----------------------------------------------------
// 2. 在有序的数组里找出指定的值，返回该值在数组中的索引，（二分查找）。
    var arr = [1, 3, 5, 7, 9, 10, 11, 12, 14, 15];

	// 方案1：
		// function getIndex(arr,val){
		// 	//....
		// 	for(var i=0;i<arr.length;i++){
		// 		if(arr[i]==val){
		// 			return i;
		// 		}
		// 	}
		// } 

		// ---------------
		// 方案2：利用findIndex()函数
		// ES6为Array增加了find()，findIndex函数。

		// find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined。

		// findIndex()函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1。
		// function getIndex(arr,val){
		// 	return arr.findIndex(function(value){
		// 		return value==val;
		// 	});
		// }
		// --------------------
		// 方案3：二分查找
		// 二分查找（折半查找）效率很高，但有个条件：数组必须是有序的(递增或递减，但是有两个相同的数是不行的)

		// 大体思路： 一分为二，一半一半的去找；1.找到数组中间的数， 以这个中间数为界左边一半，右边一半
		function getIndex(arr, val) {
			var start = 0;	//起点数据对应的索引值
			var end = arr.length - 1;	//终点数据对应的索引值

			/*
				1、这里分别处理了奇数与偶数的情况
				2、如果为奇数的话，此时只剩下了三个数字。各自走一次，刚好走到中间。走到同一个位置的话，start==end
				3、如果为偶数的话，此时只剩下两个数字。各自己就不需要再走了。再走就超了。start<end
			 */
			while (start <= end) {   //括号里是跳出条件，不满足条件就一直循环
				var middle = parseInt((start + end) / 2);  //0 1 2   当有奇数位时，除2回有小数，所以要取整parseInt()

				if (val == arr[middle]) {
					//如果这个条件成立，说明第一次的时候就找到了
					return middle;
				} else if (val < arr[middle]) {
					//数据在左侧
					end = middle - 1;
				} else if (val > arr[middle]) {
					//数据在右侧
					start = middle + 1;
				}
			}

			return -1;
		}

		console.log(getIndex(arr, 5));	//2


// 4. 查询子串首次出现的位置，如：原串abcbcxyxyz 子串为cx 结果为4。

// 5. 计算数组中，最大连续增长子序列的长度，如：[1,2,3,4,1,2,3,4,5,1,2,3] 结果为5。



// 算法：并不是某个语言特有，其实是独立的，是一种设计思想
// 通过js、java等语言都可以实现二分查找 


