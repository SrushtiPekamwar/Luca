import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="split-container">
        <div className="ls">
          <textarea name="" id=""></textarea>
          <button>Submit</button>
        </div>
        <div className="rs">
          <canvas></canvas>
        </div>
      </div>
    </>
  )
}

export default App
