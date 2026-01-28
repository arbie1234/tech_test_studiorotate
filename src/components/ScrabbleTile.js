import React from 'react';

const ScrabbleTile = ({ letter, text, isDisabled, onClick }) => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`w-16 h-16 bg-[#ffd493] border-2 border-[#e9b05a] rounded-xl font-black text-2xl text-gray-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 relative font-['Archivo_Black'] ${isDisabled
                    ? 'opacity-50 cursor-not-allowed contrast-75'
                    : 'hover:scale-105 active:scale-95 cursor-pointer'
                }`}
        >
            {letter}
            {text !== undefined && (
                <span className="absolute bottom-1 right-1 text-xs font-semibold text-gray-600">
                    {text}
                </span>
            )}
        </button>
    );
};

export default ScrabbleTile;
