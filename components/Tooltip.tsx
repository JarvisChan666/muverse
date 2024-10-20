import React from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute left-0 bottom-full mb-2 hidden w-max bg-gray-700 text-white text-xs rounded py-1 px-2 group-hover:block">
                {text}
            </div>
        </div>
    );
};