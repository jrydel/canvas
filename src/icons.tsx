import React from 'react';

export type IconProps = { width: string; height: string; color: string };

export const PointerIcon: React.FC<IconProps> = ({ width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 11v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
            <path d="M13 13l9 3l-4 2l-2 4l-3 -9" />
            <line x1="3" y1="3" x2="3" y2="3.01" />
            <line x1="7" y1="3" x2="7" y2="3.01" />
            <line x1="11" y1="3" x2="11" y2="3.01" />
            <line x1="15" y1="3" x2="15" y2="3.01" />
            <line x1="3" y1="7" x2="3" y2="7.01" />
            <line x1="3" y1="11" x2="3" y2="11.01" />
            <line x1="3" y1="15" x2="3" y2="15.01" />
        </svg>
    );
};

export const PencilIcon: React.FC<IconProps> = ({ width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
        </svg>
    );
};

export const EraseIcon: React.FC<IconProps> = ({ width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />
            <line x1="18" y1="12.3" x2="11.7" y2="6" />
        </svg>
    );
};

export const ReactangleIcon: React.FC<IconProps> = ({ width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
    );
};

export const CircleIcon: React.FC<IconProps> = ({ width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
        </svg>
    );
};

export const LineIcon: React.FC<IconProps> = ({ width, height, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="6" r="2" />
            <line x1="7.5" y1="16.5" x2="16.5" y2="7.5" />
        </svg>
    );
};
