import React, { useRef, useEffect, /*useLayoutEffect*/ } from 'react';
// import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// useLayoutEffect在浏览器渲染之前执行
// useEffect在浏览器渲染之后执行


function Counter() {
  const ref = useRef()
  useEffect(() => {
    console.log('useEffect')
    ref.current.style.transform = 'translate(200px)'
    ref.current.style.transition = 'all 1s'
  })
  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect')
  //   ref.current.style.transform = 'translate(200px)'
  //   ref.current.style.transition = 'all 1s'
  // })

  let style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
  console.log('render')
  return (
    <div>
      <div style={style} ref={ref}>盒子</div>
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
