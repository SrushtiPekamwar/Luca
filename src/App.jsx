import { useState } from 'react'
import Split from 'react-split';
import './App.css'

function App() {
  const [code, setCode] = useState('');

  return (
    <>
      <Split className="split-container" sizes={[50, 50]} minSize={200} gutterSize={3}>
        <div className="ls">
          <textarea name="" id="" value={code}
          onChange={(e) => {
            // console.log('New Value:', e.target.value); 
            setCode(e.target.value);
          }}>
          </textarea>
          <button value={code}>Compile</button>
        </div>
        <div className="rs">
          <canvas></canvas>
        </div>
      </Split>
    </>
  )
}

export default App
