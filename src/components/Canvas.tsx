import React from 'react';
import { useCanvas } from './hooks/useCanvas';

const Canvas: React.FC = () => {
    const { handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown } = useCanvas('canvas');

    return (
        <canvas
            id="canvas"
            className="fixed inset-0"
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
        >
            Canvas
        </canvas>
    );
};

export default Canvas;
