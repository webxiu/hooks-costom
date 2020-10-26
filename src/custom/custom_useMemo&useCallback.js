// import React, { useState, useMemo, useCallback, memo } from 'react';
import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 自定义useState
let lastStates = []
let index = 0;
function useState(initState) {
  lastStates[index] = lastStates[index] || initState;
  const currentIndex = index;
  function setState(newState) {
    lastStates[currentIndex] = newState
    render()
  }
  return [lastStates[index++], setState]
}

// 自定义useCallback
let lastCallback;
let lastCallbackDeps;
function useCallback(callback, deps) {
  if (lastCallbackDeps) {// 渲染过
    // 每项依赖都相同
    let changed = deps.every((item, index) => {
      return item === lastCallbackDeps[index]
    })
    if (!changed) {// 如果有不同
      lastCallback = callback;
      lastCallbackDeps = deps;
    }
  } else {// 没有渲染
    lastCallback = callback;
    lastCallbackDeps = deps
  }
  return lastCallback;
}

// 自定义useMemo
let lastMemo;
let lastMemoDeps;
function useMemo(callback, deps) {
  if (lastMemoDeps) {// 渲染过
    // 每项依赖都相同
    let changed = deps.every((item, index) => item === lastMemoDeps[index])
    if (!changed) {// 如果有不同
      lastMemo = callback();
      lastMemoDeps = deps;
    }
  } else {// 没有渲染
    lastMemo = callback();
    lastMemoDeps = deps
  }
  return lastMemo;
}

function Child({ data, addClick }) {
  console.log('child')
  return <button onClick={addClick}>添加{data.num}</button>;
}
// 返回新组件, 会判断属性变化
Child = memo(Child)

function App() {
  console.log('App')
  let [num, setNum] = useState(3)
  let [name, setName] = useState('在干啥呢')
  let addClick = useCallback(() => setNum(num + 1), [num]);
  let data = useMemo(() => ({ num }), [num]);
  console.log('data', data)
  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child data={data} addClick={addClick} />
    </>
  );
}


function render() {
  index = 0
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};
render()
