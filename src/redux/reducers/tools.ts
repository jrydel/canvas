import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { CircleIcon, EraseIcon, IconProps, LineIcon, PencilIcon, PointerIcon, ReactangleIcon } from '../../icons';

export enum ToolsAction {
    SELECTION = 'SELECTION',
    DRAW = 'DRAW',
    LINE = 'LINE',
    RECTANGLE = 'RECTANGLE',
    CIRCLE = 'CIRCLE',
    IMAGE = 'IMAGE',
}

export type ToolsType = { action: ToolsAction; Icon: React.ElementType<IconProps> };
export const tools: ToolsType[] = [
    {
        action: ToolsAction.SELECTION,
        Icon: PointerIcon,
    },
    {
        action: ToolsAction.DRAW,
        Icon: PencilIcon,
    },
    {
        action: ToolsAction.LINE,
        Icon: LineIcon,
    },
    {
        action: ToolsAction.RECTANGLE,
        Icon: ReactangleIcon,
    },
];

export const colors = [
    '#000000',
    '#16191B',
    '#343a40',
    '#495057',
    '#c92a2a',
    '#a61e4d',
    '#862e9c',
    '#5f3dc4',
    '#364fc7',
    '#1864ab',
    '#0b7285',
    '#087f5b',
    '#2b8a3e',
    '#5c940d',
    '#e67700',
    '#d9480f',
];
export const widths = [10, 15, 20];

export type ToolsState = {
    selectedAction: ToolsAction;
    selectedColor: string;
    selectedWidth: number;
};

const initialState: ToolsState = {
    selectedAction: ToolsAction.DRAW,
    selectedColor: colors[0],
    selectedWidth: widths[0],
};

export const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        setAction: (state, action: PayloadAction<ToolsAction>) => {
            state.selectedAction = action.payload;
        },
        setColor: (state, action: PayloadAction<string>) => {
            state.selectedColor = action.payload;
        },
        setWidth: (state, action: PayloadAction<number>) => {
            state.selectedWidth = action.payload;
        },
    },
});

export const toolsAction = toolsSlice.actions;

export default toolsSlice.reducer;
