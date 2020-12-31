import { useTrack, useTrigger, useUntrack } from './core';

export default function(obj) {
    // if (rawMap.has(obj)) return 
    const proxy = new Proxy(obj, {
        get(target, prop) {
            useTrack(target, prop);
            return target[prop];
        },
        set(target, prop, value) {
            target[prop] = value;
            useTrigger(target, prop);
            return true;
        },
        deleteProperty(target, prop) {
            useUntrack(target, prop);
            delete target[prop];
        },
    });
    return proxy;
}
