import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { colors, tools, ToolsAction, toolsAction, ToolsType, widths } from '../redux/reducers/tools';

const Tool: React.FC<{ tool: ToolsType }> = ({ tool }) => {
    const selectedAction = useAppSelector((state) => state.tools.selectedAction);
    const dispatch = useAppDispatch();

    const selected = selectedAction === tool.action;

    return (
        <div
            className={`${selected ? 'bg-blue-400' : ''} cursor-pointer p-2 rounded-lg flex items-center justify-center`}
            onClick={() => dispatch(toolsAction.setAction(tool.action))}
        >
            <button className={`${selected ? 'text-white' : 'text-black'} font-bold`}>
                <tool.Icon width="24" height="24" color={selected ? '#fff' : '#000'} />
            </button>
        </div>
    );
};

const Tools: React.FC = () => {
    const { selectedAction, selectedColor, selectedWidth } = useAppSelector((state) => state.tools);
    const dispatch = useAppDispatch();

    return (
        <div className="cursor-default">
            <div className="fixed flex items-center p-2 space-x-2 -translate-x-1/2 bg-white border rounded-lg shadow-md select-none top-4 left-1/2">
                {tools.map((it, i) => (
                    <Tool key={i} tool={it} />
                ))}
            </div>
            {[ToolsAction.DRAW, ToolsAction.LINE, ToolsAction.RECTANGLE, ToolsAction.CIRCLE].includes(selectedAction) && (
                <div className="fixed z-10 grid grid-cols-1 gap-4 p-2 -translate-y-1/2 bg-white border rounded-lg shadow-md top-1/2 right-4">
                    <div className="flex flex-col space-y-2">
                        <span className="text-sm font-bold text-center">Line width</span>
                        <div className="flex items-center justify-around">
                            {widths.map((it, i) => (
                                <button
                                    key={i}
                                    onClick={() => dispatch(toolsAction.setWidth(it))}
                                    style={{ backgroundColor: selectedColor, width: `${it}px`, height: `${it}px` }}
                                    className={`rounded-full ${selectedWidth === it ? 'outline outline-offset-2 outline-2' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-sm font-bold text-center">Colors</span>
                        <div className="grid grid-cols-2 gap-2">
                            {colors.map((it, i) => (
                                <button
                                    key={i}
                                    onClick={() => dispatch(toolsAction.setColor(it))}
                                    style={{ backgroundColor: it }}
                                    className={`h-8 w-8 rounded-full ${selectedColor === it ? 'outline outline-offset-2 outline-2' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tools;
