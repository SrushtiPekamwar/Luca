import { useRef, useState } from "react";
import parse from "./compiler/parser";
import Split from 'react-split';
import PieChart from './components/pie-chart/PieChart';
import ClearScreen from './components/ClearScreen';
import DonutChart from './components/donut-chart/DonutChart';
import html2canvas from "html2canvas";

function Editor() {
    const [code, setCode] = useState('');
    // const [data, setData] = useState({});
    const [component, setComponent] = useState();
    const canvasRef = useRef(null)
    const [canvasReady, setCanvasReady] = useState(false)
    const rsRef = useRef(null);


    const handleSubmit = function () {
        console.log("hey");
        var data = parse(code);
        console.log(data);

        if (data.type == "pieChart") {
            setComponent(<PieChart data={data} canvasRef={canvasRef} />)
            setCanvasReady(true)
        }
        if (data.type == "donutChart") {
            setComponent(<DonutChart data={data} canvasRef={canvasRef} />)
            setCanvasReady(true)
        }
    }

    const handleClear = function () {
        setComponent(<ClearScreen />)
        setCanvasReady(false)
    }

    const downloadCanvas = async () => {
        const div = rsRef.current;
        if (!div) return;

        // Capture as image
        const canvas = await html2canvas(div);
        const imageUrl = canvas.toDataURL('image/png');

        // Create virtual download link
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'chart.png';
        link.click();
    };

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
                        {canvasReady && <button onClick={handleClear}>Clear</button>}
                        {canvasReady && <button onClick={downloadCanvas}>Download</button>}
                        <button onClick={handleSubmit}>Compile</button>
                    </div>

                </div>
                <div className="rs" ref={rsRef}>
                    {component}
                </div>
            </Split>
        </>
    )
}

export default Editor