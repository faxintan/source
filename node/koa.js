class MyKoa {
    constructor() {
        this.middlewares = [];
    }

    use(middle) {
        this.middlewares.push(middle);
        return this;
    }

    run(fn) {
        this._compose(this.middlewares)(this, fn);
    }

    _compose(middlewares) {
        return function(ctx, next) {
            let index = -1;

            function dispatch(i) {
                if (i <= index) {
                    return Promise.reject(new Error('next() called multiple times'));
                }
                // 中间件迭代
                let fn = middlewares[index = i];

                // 判断是否为最后一个中间件
                if (i === middlewares.length) fn = next;

                if (!fn) return Promise.resolve(); // 中间件链终点

                try {
                    return Promise.resolve(
                        // 执行当前中间件，并把下一个迭代执行器交给下一个中间件
                        fn(ctx, () => { return dispatch(i + 1) }),
                    );
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            return dispatch(0);
        }
    }
}

const koa = new MyKoa();

koa.use(async (_, next) => {
    console.log('1: before await');
    await next();
    console.log('1: after await');
});

koa.use(async (_, next) => {
    console.log('2: before await');
    await next();
    console.log('2: after await');
});

koa.use(async (_, next) => {
    console.log('3: before await');
    await next();
    console.log('3: after await');
});

koa.run(async () => {
    console.log('~~洋葱中心~~');
});
