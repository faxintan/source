/**
 * 柯里化函数
 * 
 * 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
 */

// 例子1: 简单、非通用版柯里化函数
function add(x) {
  return function(y) {
    return x + y;
  }
}

const addTen = add(10);



// 例子2：通用版柯里化函数(通过递归自动柯里化)
function currying(fn, ...args) {
  // Function.prototype.length 代表函数定义参数个数
  if (args.length >= fn.length) {
    return fn(...args);
  }

  // 通过闭包不断叠加保存每次curry化时的入参
  return function(...args2) {
    return currying(fn, ...args, ...args2);
  }
}
