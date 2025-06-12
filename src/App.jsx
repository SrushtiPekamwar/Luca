import {
  useState, useRef, useEffect
} from 'react'
import Split from 'react-split';
import './App.css'

function App() {
  const [code, setCode] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const x = canvas.offsetWidth / 2;
    const y = canvas.offsetHeight / 2;
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, 150, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
    ctx.fillStyle = "black"; // Change to any color
    ctx.fill();
  }, []);
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
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      </Split>
    </>
  )
}

export default App
