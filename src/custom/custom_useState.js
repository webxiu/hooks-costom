// import React, { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// 自定义useState

let lastState;
function useState(initState) {
  console.log('initState', lastState)
  lastState = lastState || initState;
  function setState(newState) {
    lastState = newState
    render()
  }
  return [lastState, setState]
}

function App() {
  const [state, setState] = useState(3)
  return (
    <>
      <p>状态: {state}</p>
      <button onClick={() => setState(state + 1)}>添加</button>
    </>
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
