// 问题：**观察者模式** 和 **发布订阅模式** 有什么区别？
// 观察者模式 是基于发布订阅模式的，而且 观察者模式下  发布 和  订阅 是有关系的。

// vue就是典型的观察者模式
// vue 特点：1、监听数据的变化  2、数据变化后更新视图

// 被观察者
class Subject{   //类class   //同学
    constructor(name){
        this.name = name;
        this.state = '及格';  //被观察者实例 有一个属性state
        this.observerArr = [];  //1.写一个空数组，里面放观察者
    }
    attach(observer){   //2.写一个方法，想给被观察者绑定观察者就调用这个方法
        this.observerArr.push(observer);
        // console.log(this.name +'的观察者是'+observer+';'+this.name+'当前状态'+this.state);
    }
    setState(newState){  //被观察者实例有个方法，当state 改变时调用此方法
        this.state = newState ; //冲刺你给state赋值
        //本该在这里 状态修改时调用观察者的方法，但是由于 是多个观察者，所有我们先把观察者放在一个数组里，然后在这遍历观察者，然后调用其方法；
        this.observerArr.forEach( o => o.updateState(this.name,newState))
        // 被观察这数据状态改变时， 调用观察者的方法，并把修改后的状态传过去，然后在观察者的方法里写相应的逻辑
    }
}

// observer 观察者
class Observer{  //老师
    constructor(oname){
        this.oname = oname;
    }
    updateState(sname,newState){  //观察者的一个方法
        console.log(`${this.oname}反应：${sname}当前状态 ${newState}`);    
    }

}
let o1 = new Observer('李老师');   //注册观察者   new 一个被观察者实例，传一个实参：name，这个实参的形参写在构造器那里；
let o2 = new Observer('班主任');  

let s = new Subject('王同学'); 
// let o2 = new Observer('你情敌')

s.attach(o1);   //3. 给被观察者绑定观察者
s.attach(o2);  

s.setState('不及格')
s.setState('及格')
