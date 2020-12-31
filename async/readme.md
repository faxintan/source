# 异步处理流程

## Promise

[掘金文献](https://juejin.cn/post/6844904063570542599)

## Generator

1. 迭代器: 迭代器是一种特殊对象，具有专门为迭代流程设计的 next() 方法。每次调用 next() 都会返回一个包含 value 和 done 属性的对象

2. 生成器: 返回迭代器的函数，通过 function 关键字后跟星号 (*) 来表示，此外函数中还需要包含新关键字 yield

3. yield 关键字: 用来暂停和恢复一个生成器函数。yield 后面的表达式的值返回给生成器的调用者，可以认为 yield 是基于生成器版本的 return 关键字

4. next 方法: 返回一个包含属性 done 和 value 的对象，也可以接受一个参数用以向生成器传值

5. 异步流程控制: Generator 函数可以暂停执行和恢复执行，next() 可以做函数体内外数据交换，使其可以作为异步编程的完整解决方案

6. 自动流程管理: 基于 Thunk 函数的自动流程管理，我们约定 yield 关键字后的表达式返回只接受 callback 参数的函数，即前面讲的 Thunk 类型函数。基于 Thunk Generator 简单自动执行器如下

7. 状态机: 生成器函数内部存在 undefined、suspendedStart、suspendedYield、executing、completed 五种状态

[掘金文献](https://juejin.cn/post/6844903641858457608)

## Await
