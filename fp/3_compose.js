/**
 * 组合函数
 * 
 * 对要嵌套执行的函数进行平铺，嵌套执行指的是一个函数的返回结果作为另一个函数的执行参数。
 * 核心思想是专注于函数执行过程，隔离数据的影响
 * 
 */

const increment = x => x + 1;
const square = x => x * x;

// 例子1: 简单、非通用版组合函数
const compose1 = (f, g) => {
  return (x) => f(g(x));
}

const result1 = compose1(increment, square)(10);


// 例子2: 通用版组合函数
const compose2 = (...args) => x => args.reduceRight((res, next) => next(res), x);

const result2 = compose2(increment, square)(10);


