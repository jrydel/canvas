import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { ToolsAction, colors } from '../../redux/reducers/tools';

type Element = {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
    color: string;
    action: ToolsAction;

    selected?: boolean;
    offsetX?: number;
    offsetY?: number;
    url?: string;
    path?: { x: number; y: number }[];
};

enum CanvasAction {
    NONE = 'NONE',
    MOVING = 'MOVING',
    DRAWING = 'DRAWING',
}

export const useCanvas = (id: string) => {
    const [elements, setElements] = React.useState<Element[]>([]);
    const [selectedElements, setSelectedElements] = React.useState<Element[]>([]);
    const [canvasAction, setCanvasAction] = React.useState(CanvasAction.NONE);

    const { selectedAction, selectedColor, selectedWidth } = useAppSelector((state) => state.tools);

    React.useLayoutEffect(() => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        if (context) draw(context, canvas.width, canvas.height);
    }, [elements]);

    const draw = (context: CanvasRenderingContext2D, width: number, height: number) => {
        context.clearRect(0, 0, width, height);
        for (const element of elements) {
            switch (element.action) {
                case ToolsAction.RECTANGLE: {
                    context.beginPath();
                    context.strokeStyle = element.color;
                    context.lineWidth = element.width;
                    context.strokeRect(element.x1, element.y1, element.x2 - element.x1, element.y2 - element.y1);
                    break;
                }
                case ToolsAction.LINE: {
                    context.beginPath();
                    context.strokeStyle = element.color;
                    context.lineWidth = element.width;
                    context.moveTo(element.x1, element.y1);
                    context.lineTo(element.x2, element.y2);
                    context.stroke();
                    break;
                }
                case ToolsAction.DRAW: {
                    context.beginPath();
                    context.lineCap = 'round';
                    context.strokeStyle = element.color;
                    context.lineWidth = element.width;

                    let lastDot = null;
                    for (const dot of element.path || []) {
                        if (!lastDot) {
                            lastDot = dot;
                            continue;
                        }
                        context.moveTo(lastDot.x, lastDot.y);
                        context.lineTo(dot.x, dot.y);
                        lastDot = dot;
                    }
                    context.stroke();
                    break;
                }
                case ToolsAction.IMAGE: {
                    const img = new Image();
                    img.src = element.url || '';
                    img.onload = () => {
                        context.drawImage(img, 0, 0);
                    };
                    break;
                }
            }
        }
    };

    const handleStart = (x: number, y: number) => {
        if (selectedAction === ToolsAction.SELECTION) {
            const element = getElementAtMousePosition(x, y, elements);
            if (element) {
                const elementWithOffset: Element = { ...element, offsetX: x - element.x1, offsetY: y - element.y1, selected: true };
                // TODO we should check here if element is already in array
                setSelectedElements((prev) => [...prev, elementWithOffset]);
                setCanvasAction(CanvasAction.MOVING);
            } else {
                setElements((prev) => prev.map((it) => ({ ...it, selected: false })));
            }
        } else {
            addOrUpdateElement({
                id: elements.length,
                x1: x,
                y1: y,
                x2: x,
                y2: y,
                action: selectedAction,
                color: selectedColor,
                width: selectedWidth,
            });
            setCanvasAction(CanvasAction.DRAWING);
        }
    };

    const handleMove = (x: number, y: number) => {
        if (canvasAction === CanvasAction.DRAWING) {
            const index = elements.length - 1;
            const element = elements[index];

            if (selectedAction === ToolsAction.DRAW) {
                const path = [...(element.path || []), { x, y }];
                addOrUpdateElement({ ...element, path });
            } else {
                addOrUpdateElement({ ...element, x2: x, y2: y });
            }
        } else if (canvasAction === CanvasAction.MOVING) {
            for (const element of selectedElements) {
                const tempX1 = x - (element.offsetX || 0);
                const tempY1 = y - (element.offsetY || 0);
                const width = element.x2 - element.x1;
                const height = element.y2 - element.y1;
                addOrUpdateElement({ ...element, x1: tempX1, y1: tempY1, x2: tempX1 + width, y2: tempY1 + height });
            }
        }
    };

    const handleEnd = (x: number, y: number) => {
        setCanvasAction(CanvasAction.NONE);
    };

    const addOrUpdateElement = (element: Element) => {
        const elementsCopy = [...elements];
        elementsCopy[element.id] = element;
        setElements(elementsCopy);
    };

    // const handlePaste = (e: any) => {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     const image = e.clipboardData.files[0];
    //     console.log(image);

    //     if (image) {
    //         const objectUrl = URL.createObjectURL(image);
    //         addOrUpdateElement({
    //             id: elements.length,
    //             x1: 0,
    //             y1: 0,
    //             x2: 200,
    //             y2: 200,
    //             action: ToolsAction.IMAGE,
    //             url: objectUrl,
    //             width: selectedWidth,
    //             color: selectedColor,
    //         });
    //     }
    // };

    return { handleStart, handleMove, handleEnd };
};

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const isWithinElement = (x: number, y: number, element: Element) => {
    if (element.action === ToolsAction.RECTANGLE) {
        const minX = Math.min(element.x1, element.x2);
        const maxX = Math.max(element.x1, element.x2);
        const minY = Math.min(element.y1, element.y2);
        const maxY = Math.max(element.y1, element.y2);
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
        const a = { x: element.x1, y: element.y1 };
        const b = { x: element.x2, y: element.y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < 1;
    }
};

const getElementAtMousePosition = (x: number, y: number, elements: Element[]) => {
    return elements.find((element) => isWithinElement(x, y, element));
};
