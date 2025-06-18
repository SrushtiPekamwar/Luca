import { useRef, useEffect, useState } from "react";

function ClearScreen() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState(0);

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

        const canvas = canvasRef.current;

        canvas.height = canvasSize
        canvas.width = canvasSize
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        console.log("Done");
    }, []);
    return (
        <div className="canvas-container" ref={containerRef}>
            <canvas
                ref={canvasRef}
            />
        </div>

    )
}


export default ClearScreen;