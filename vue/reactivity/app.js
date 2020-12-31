import { useEffect } from './hooks/core';
import useReactive from './hooks/reactive';

let count = 1;

export default function() {
    const data = useReactive({ greeting: { test: 'test' } });

    setInterval(() => {
        data.greeting.test = ++count;
    }, 1000);

    return useEffect(() => {
        document.body.innerHTML = `<div id="test">${data.greeting.test}</div>`;
    });
}
