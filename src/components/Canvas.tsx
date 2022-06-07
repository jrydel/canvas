import React from 'react';
import { useCanvas } from './hooks/useCanvas';

const Canvas: React.FC = () => {
    const { handlePaste, handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown } = useCanvas('canvas');

    React.useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, []);

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
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchCancel={handleMouseUp}
        />
    );
};

export default Canvas;
