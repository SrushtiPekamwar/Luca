import { useState } from "react";
import parse from "./compiler/parser";
import Split from 'react-split';
import PieChart from './components/pie-chart/PieChart';
import ClearScreen from './components/ClearScreen';
import DonutChart from './components/donut-chart/DonutChart';

function Editor() {
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
        if (data.type == "donutChart") {
            setComponent(<DonutChart data={data} />)
        }
    }

    const handleClear = function () {
        setComponent(<ClearScreen />)
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
                    <div className="btns">
                        <button onClick={handleClear}>Clear</button>
                        <button onClick={handleSubmit}>Compile</button>
                    </div>

                </div>
                <div className="rs">
                    {component}
                </div>
            </Split>
        </>
    )
}

export default Editor