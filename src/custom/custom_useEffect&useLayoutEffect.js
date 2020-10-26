// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 自定义useEffect, 与useLayoutEffect差别在是否render后再执行(使用定时器处理)
let lastCallbackDeps;
function useEffect(callback, deps) {
  if (lastCallbackDeps) {// 渲染过
    // 每项依赖都相同
    let changed = deps.every((item, index) => {
      return item === lastCallbackDeps[index]
    })
    if (!changed) {// 如果有不同
      // callback();
      setTimeout(callback);
      lastCallbackDeps = deps;
    }
  } else {// 没有渲染
    // callback();
    setTimeout(callback); // 异步非阻塞
    lastCallbackDeps = deps
  }
}
// 自定义useLayoutEffect
let lastLayoutDeps;
function useLayoutEffect(callback, deps) {
  if (lastLayoutDeps) {// 渲染过
    // 每项依赖都相同
    let changed = deps.every((item, index) => {
      return item === lastLayoutDeps[index]
    })
    if (!changed) {// 如果有不同
      // callback();
      Promise.resolve().then(callback) //放入微任务处理
      // 或者用 queueMicrotask(callback)
      lastLayoutDeps = deps;
    }
  } else {// 没有渲染
    // callback();
    Promise.resolve().then(callback) //放入微任务处理
    // 或者用 queueMicrotask(callback)
    lastLayoutDeps = deps
  }
}


function Counter() {
  let [name, setName] = useState('上上')
  let [num, setNum] = useState(6)
  useEffect(() => {
    console.log('useEffect')
  }, [num, name])
  return (
    <div>
      <p>{num}</p>
      <p>{name}</p>
      <button onClick={() => setName(Date.now())}>修改名称</button>
      <button onClick={() => setNum(num + 1)}>增加</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}


function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};
render()
