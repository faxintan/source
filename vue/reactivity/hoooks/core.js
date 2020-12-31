let activeEffect;
let targetMap = new WeakMap();

export const useEffect = function(fn, opts = {}) {
    const _effect = function(...args) {
        activeEffect = _effect;
        return fn(...args);
    };

    if (!opts.lazy) {
        _effect();
    }

    return _effect;
}

export const useTrack = function(target, key) {
    let depsMap = targetMap.get(target);

    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }

    let dep = depsMap.get(key);

    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
}

export const useUntrack = function(target, key) {
    let depsMap = targetMap.get(target);

    if (!depsMap) return;

    let dep = depsMap.get(key);

    if (dep) {
        dep.clear();
    }

    depsMap.delete(key);
}

export const useTrigger = function(target, key) {
    const depsMap = targetMap.get(target);

    if (!depsMap) return;

    depsMap.get(key).forEach(effect => effect());
}
