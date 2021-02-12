class Scheduler {
  constructor(limit = 2) {
    this.queue = [];
    this.results = [];
    this.executing = [];
    this.taskExecuted = 0;
    this.limit = limit;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  execute() {
    const execute = () => {
      if (this.taskExecuted === this.queue.length) return Promise.resolve();

      const task = this.queue[this.taskExecuted++];
      
      const p = Promise.resolve().then(task);
      this.results.push(p);

      const e = p.then(() => {
        this.executing.splice(this.executing.indexOf(e), 1);
      });
      this.executing.push(e);

      if (this.executing.length >= this.limit) {
        return Promise.race(this.executing).then(execute);
      } else {
        return Promise.resolve().then(execute);
      }
    }

    return execute().then(() => Promise.all(this.results));
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

scheduler.execute().then(console.log);
