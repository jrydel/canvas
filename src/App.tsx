import React from 'react';

import { useAppSelector } from './redux/hooks';
import { ToolsAction } from './redux/reducers/tools';

import Canvas from './components/Canvas';
import Grid from './components/Grid';
import Tools from './components/Tools';

const App: React.FC = () => {
    const selectedAction = useAppSelector((state) => state.tools.selectedAction);
    const selectedColor = useAppSelector((state) => state.tools.selectedColor);

    const cursor = () => {
        switch (selectedAction) {
            case ToolsAction.DRAW: {
                return `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='10' fill='${encodeURIComponent(
                    selectedColor,
                )}' /%3E%3C/svg%3E") 20 20, auto`;
            }
            default: {
                ('auto');
            }
        }
    };

    return (
        <div className="relative w-full h-screen" style={{ cursor: cursor() }}>
            <Grid />
            <Canvas />
            <Tools />
        </div>
    );
};

export default App;
