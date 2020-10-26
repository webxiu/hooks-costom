// import React, { useState,useReducer } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 自定义useReducer
function reducer(state, action) {
  if (action.type === 'add') {
    return state + 1;
  } else if (action.type === 'sub') {
    return state - 1;
  } else {
    return state
  }
}

let lastState;
function useReducer(reducer, initState) {
  lastState = lastState || initState;
  function dispatch(action) {
    lastState = reducer(lastState, action);
    render()
  }
  return [lastState, dispatch]
}



function App() {
  const [state, dispatch] = useReducer(reducer, 3)
  return (
    <>
      <p>状态: {state}</p>
      <button onClick={() => dispatch({ type: 'add' })}>添加</button>
      <button onClick={() => dispatch({ type: 'sub' })}>减少</button>
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
