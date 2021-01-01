/**
 * Pointfree编码风格
 * 
 * 运算过程抽象化，不使用所要处理的值，只合成运算过程
 * 
 * 无需考虑参数命名：能减轻不少思维负担，毕竟参数命名也是个很费事的过程。
 * 关注点集中：你无需考虑数据，只需要把所有的注意力集中在转换关系上。
 * 代码精简：可以省去通过中间变量不断的去传递数据的过程。
 * 可读性强：一眼就可以看出来数据的整个的转换关系。

 * @ref http://www.ruanyifeng.com/blog/2017/03/pointfree.html
 */

const prop = (p, obj) => obj[p];
const propRole = R.curry(prop)('role');
const isWorker = role => role === 'worker';

const getWorkers = R.filter(R.pipe(propRole, isWorker));