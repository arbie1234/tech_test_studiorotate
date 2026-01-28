import React from 'react';
const MiniWordTiles = ({ word }) => {
    if (!word) return null;

    const letters = word.toUpperCase().split('');
    return (
        <div className="flex flex-wrap gap-1">
            {letters.map((letter, index) => (
                <div
                    key={index}
                    className="w-8 h-8 bg-[#ffd493] border-2 border-[#e9b05a] rounded-md flex items-center justify-center relative shadow-sm"
                >
                    <span className="font-bold text-gray-800 text-sm font-['Archivo_Black']">
                        {letter}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default MiniWordTiles;
