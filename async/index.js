const MyPromise = require('./1_promise');

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('test');
  }, 1000);
})
  /* promise1 */.then(
    (data) => {
      return new MyPromise((resolve) => {resolve(data + 100);});
    },
    // (data) => { console.log(data); return new MyPromise((resolve) => setTimeout(() => resolve(data + 100), 100)) },
    (err) => { console.log('error', err); },
  )
  /* promise2 */.then((data) => console.log('链式Promise：', data))
  /* promise3 */.then((data) => console.log('next: ', data))
  /* promise4 */.then((data) => console.log('next: ', data))
  /* promise5 */.then((data) => console.log('next: ', data))
