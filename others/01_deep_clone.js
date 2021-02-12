var map = {String, Number, Boolean, RegExp, Date, Set, Map };

function getType(data) {
  return /\s(.+)]$/.exec(
    Object.prototype.toString.call(data),
  )[1];
}

function deepClone(data, hash = new WeakMap()) {
  if (typeof data !== 'object') throw new Error('参数错误!');
  if (hash.has(data)) return hash.get(data);

  let newData = {};
  
  // Reflect.ownKeys可以读取属性值为Symbol的key
  Reflect.ownKeys(data).forEach((key) => {
    const value = data[key];
    const valueType = getType(value);
    
    if (!value || typeof value === 'symbol' || typeof value !== 'object') {
      return newData[key] = value;
    }

    if (Array.isArray(value)) {
      return newData[key] = [...value];
    }

    if (map[valueType]) {
      return newData[key] = new map[valueType](
        valueType === 'Boolean'
          ? value.valueOf()
          : (valueType === 'Set' || valueType === 'Map') ? [...value] : value,
      );
    }

    if (typeof value === 'object') {
      hash.set(data, data); // 将待拷贝对象引用存到hash中
      newData[key] = deepClone(value, hash);
    }
  });

  return newData;
}

var a = {
  string: 'test',
  String: new String('test'),
  number: 1,
  Number: new Number(2),
  boolean: true,
  Boolean: new Boolean(false),
  Set: new Set([1,2,3,4,4,4,4]),
  Map: new Map([[1,2], [3,4]]),
  RegExp: /test/,
  Date: new Date(),
  Array: [1,2,3,4,5],
  // chain: a, // 声明提升，初始化a属性值时，a的赋值操作还未完成，a还是undefined
}
a.chain = a;

var b = deepClone(a);

Reflect.ownKeys(a).forEach(key => {
  console.log(`${key}: ${b[key]} - ${a[key] === b[key]}\n`);
});