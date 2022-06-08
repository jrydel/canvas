import React from 'react';
import { useCanvas } from './hooks/useCanvas';

const Canvas: React.FC = () => {
    const { handleStart, handleMove, handleEnd } = useCanvas('canvas');

    // React.useEffect(() => {
    //     window.addEventListener('paste', handlePaste);
    //     return () => window.removeEventListener('paste', handlePaste);
    // }, []);

    return (
        <canvas
            id="canvas"
            className="fixed inset-0"
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={(e) => handleEnd(e.clientX, e.clientY)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchCancel={(e) => handleEnd(e.touches[0].clientX, e.touches[0].clientY)}
        />
    );
};

export default Canvas;
