// 因为状态常用，所以放在常量里
// 这里面的方法分为：实例上的方法，私有方法 和原型上的方法
// 一般写类 就是面向对象，写函数就是面向过程
const PENDING = 'PENDIND';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise{
    constructor(executor){  //new Promise的时候会传一个函数，这个函数就是executor，执行器，
        //new Promise 就是用构造函数 或者constructor 构造实例
        this.state = PENDING ;  //默认是等待态， 在构造器里的属性，每个函数都有自己的属性（每个实例的值不同-独立），且可以在原型的方法上使用
        this.value = undefined;  //成功的值
        this.reason = undefined;  //失败的原因

        this.onResolvedCallbaks = [];  //成功的回调函数的数组
        this.onRejectedCallbacks = [];  //失败的回调函数的数组

        // 构造函数executor里有两个函数参数，这两个函数不需要在then方法里拿到，且属于当前构造函数里,所以在构造器里定义
        
        //这里 resolve 和 reject方法就是私有方法，在类外面找不到这个方法，不能通过事件调用
        let resolve = (value) => {    //这里用箭头函数 可以避免this 指向问题，不然以后的 resolve()里的this 可能指向window           
            //成功函数，resolve 的时候要传一个参数：成功的值，但是这个参数我们要在then 方法里使用
            // 所以我们要把这个参数也存在构造函数/构造器里
            if(this.state === PENDING){  //状态为PENDING才能改指 改状态
                this.value = value;  //一调用resolve方法酒吧 调用时传的参数 存给构造函数构造的实例里了
                this.state = RESOLVED;  //成功后修改状态
                this.onResolvedCallbaks.forEach( fn => fn()); //执行then时存起来的方法，在执行器走完后执行
            }
        }
        let reject = (reason) => {
            //失败函数，reject的时候要传一个参数：失败的原因，要在then 方法里使用这个参数
            if(this.state === PENDING){ 
                this.reason = reason ;
                this.state = REJECTED;  //失败后修改状态
                this.onRejectedCallbacks.forEach( fn => fn());
            }
        }
        try{
            executor(resolve , reject ) ; //执行器会立刻执行，一new 就执行了,我们把成功函数 和 失败函数当作参数 传给执行器
        // 这是构造函数里
        }catch(e){
            reject(e);  //如果执行 executor方法时报错了，就执行reject方法；
        }        
    }
    // 1.看这个属性能否在原型上使用
    // 2.看属性是否公用
    // then 里面要用到状态， 且每个实例要有自己的状态，不能放在公用上，所以就把状态放在自己的构造函数中constructor里
    
    then(onfulfilled,onrejected){    // then方法有2个 方法参数

        // 同步
        // then方法每个实例都有，肯定是在原型上的，也就是Promise.prototype.then = function(){}
         if(this.state === RESOLVED){ //成功的时候执行第一个参数
            onfulfilled(this.value);  //执行第一个方法参数，传一个参数，参数是在new promise是执行器立即行，执行成功后传的值
         }
         if(this.state ===REJECTED){
            onrejected(this.reason)
         }

        //  异步情况
         // 如果是异步的  就先订阅好
         if(this.state === PENDING){  //当执行then()但状态不是成功也不是失败，是等待说明还没执行完，可以先把方法存到数组里
            //等执行完再调用这些方法
            // this.onResolvedCallbaks.push(onfulfilled);  这样写可以，但是没办法在里面添加一些自己的方法了
            this.onResolvedCallbaks.push( () => {   //我们可以这样写返回一个函数，在这个函数里调用执行 方法，还可以加自己的逻辑
                // todo...
                onfulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {   //then 的时候 new Promise()没有执行完，把方法存到数组里，等执行完在执行，
                // 应该是执行器里的resolve  和 reject方法里执行这些方法
                // todo...
                onrejected(this.reason);
            });

         }
    }
}
module.exports = Promise;