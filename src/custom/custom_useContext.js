// import React, { useState, useContext } from 'react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 创建上下文
let AppContext = React.createContext()

// 自定义useReducer
function useContext(context) {
  return context._currentValue;
}

function Counter() {
  let { num, setNum } = useContext(AppContext)
  return (
    <div>
      <p>{num.val}</p>
      <button onClick={() => setNum({ val: num.val + 1 })}>增加</button>
    </div>
  )
}

function App() {
  let [num, setNum] = useState({ val: 2 })
  return (
    <AppContext.Provider value={{ num, setNum }}>
      <div>
        <Counter />
      </div>
    </AppContext.Provider>
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
