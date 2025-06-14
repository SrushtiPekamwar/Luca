import {
  useState
} from 'react'
import Split from 'react-split';
import './App.css'
import parse from './compiler/parser';
import PieChart from './components/PieChart';

function App() {
  const [code, setCode] = useState('');
  // const [data, setData] = useState({});
  const [component, setComponent] = useState();

  const handleSubmit = function () {
    console.log("hey");
    var data = parse(code);
    console.log(data);

    if (data.type == "pieChart") {
      setComponent(<PieChart data={data} />)
    }
  }

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
          <button onClick={handleSubmit}>Compile</button>
        </div>
        <div className="rs">
          {component}
        </div>
      </Split>
    </>
  )
}

export default App
