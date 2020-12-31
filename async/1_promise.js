const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // Promise初始状态（仅可以变更一次）
    this.status = PENDING;

    // 状态变更默认处理
    this.onResolvedCallback = function(data) { return data; };
    this.onRejectedCallback = function(err) { throw new Error(err); };

    // 更改Promise状态为成功
    const resolve = (data) => {
      if (this.status === PENDING) {
        this.data = data;
        this.status = FULFILLED;
        // 下一个微任务队列中处理成功回调(让then先注册回调方法)
        process.nextTick(() => {
          this.onResolvedCallback(data);
        });
      }
    }

    // 更改Promise状态为失败
    const reject = (err) => {
      if (this.status === PENDING) {
        this.data = err;
        this.status = REJECTED;
        // 下一个微任务队列中处理失败回调(让then先注册回调方法)
        process.nextTick(() => {
          this.onRejectedCallback(err);
        });
      }
    }

    try {
      // 立即执行任务，并更改状态(不能使用异步调用)
      // Tips: 如果构造函数异步执行，则then中返回Promise同样异步，因此then注册回调比构造函数晚
      executor(resolve, reject);
    } catch (e) {
      process.nextTick(() => {
        this.onRejectedCallback(e);
      });
    }
  }

  then(onResolved, onRejected) {
    const handleResolved = typeof onResolved === 'function' ? onResolved : this.onResolvedCallback;
    const handleRejected = typeof onRejected === 'function' ? onRejected : this.onRejectedCallback;

    if (this.status === PENDING) {
      return new MyPromise((resolve, reject) => {
        // Notice: 真实的callback在Promise构造函数中完成赋值
        this.onResolvedCallback = () => {
          try {
            const result = handleResolved(this.data);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (e) {
            handleRejected(e);
          }
        }

        this.onRejectedCallback = () => {
          try {
            const result = handleRejected(this.data);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (e) {
            handleRejected(e);
          }
        }
      });
    }


    return new MyPromise((resolve, reject) => {
      try {
        // Promise状态变更后，触发返回Promise的状态控制
        const result = this.status === FULFILLED
          ? handleResolved(this.data)
          : handleRejected(this.data);

        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (e) {
        handleRejected(e);
      }
    });
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }
}

module.exports = MyPromise;
