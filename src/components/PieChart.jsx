import { useRef, useEffect } from "react";



function PieChart({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {

        var values = data.data;
        var total = 0;
        var lastend = 0;
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
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
        console.log("Done");

        // const x = canvas.offsetWidth / 2;
        // const y = canvas.offsetHeight / 2;
        // // Clear previous drawings

        // // Draw a filled circle
        // ctx.beginPath();
        // ctx.arc(x, y, 150, 0, Math.PI / 3); // x, y, radius, startAngle, endAngle
        // ctx.lineTo(x, y);
        // ctx.fillStyle = "black"; // Change to any color
        // ctx.fill();
    }, [data]);
    return (
        <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
        />
    )
}

function getRandomHexColor() {
    return '#' + (function co(lor) {
        return (lor +=
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
            && (lor.length == 6) ? lor : co(lor);
    })('');
}

export default PieChart;