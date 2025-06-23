import { useRef, useEffect, useState } from "react";
import DonutChartLegend from "./DonutChartLegend";

function DonutChart({ data, canvasRef }) {
    const containerRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState(0);
    var values = data.data;

    useEffect(() => {
        const resizeCanvas = () => {
            const container = containerRef.current;
            if (container) {
                const size = Math.min(container.offsetWidth, container.offsetHeight);
                setCanvasSize(size);
            }
        };

        const observer = new ResizeObserver(resizeCanvas);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);



    useEffect(() => {

        var total = 0;
        var lastend = 0;
        const canvas = canvasRef.current;

        canvas.height = canvasSize
        canvas.width = canvasSize
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var e = 0; e < values.length; e++) {
            total += parseInt(values[e].value);
        }

        console.log(total);


        for (var i = 0; i < values.length; i++) {

            if ("color" in values[i]) {
                ctx.fillStyle = values[i].color;
            } else {
                const color = getRandomHexColor();
                ctx.fillStyle = color;
                console.log("color : " + color);
                values[i].color = color;
            }

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(
                canvas.width / 2,  // x
                canvas.height / 2, // y
                canvas.height / 4, // radius
                lastend,           // startingAngle (radians)
                lastend + Math.PI * 2 * (values[i].value / total), // endingAngle (radians)
                false // antiClockwise (boolean)
            );
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastend += Math.PI * 2 * (values[i].value / total);
            console.log(lastend);

        }

        setTimeout(() => {
            ctx.beginPath();
            ctx.fillStyle = "#24292e"
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 8, 0, Math.PI * 2, true); // Hole anticlockwise
            ctx.fill();
        }, 200)


    }, [data]);
    return (
        <div className="canvas-container" ref={containerRef}>
            <canvas
                ref={canvasRef}
            />
            <DonutChartLegend values={values} />
        </div>

    )
}

function getRandomHexColor() {
    return '#' + (function co(lor) {
        return (lor +=
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
            && (lor.length == 6) ? lor : co(lor);
    })('');
}

export default DonutChart;