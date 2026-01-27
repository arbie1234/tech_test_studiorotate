import React, { useState } from 'react';

const ScrabbleGame = () => {
    // Sample state for demonstration
    const [currentWord, setCurrentWord] = useState('SAD');
    const [score, setScore] = useState(6);
    const [totalScore, setTotalScore] = useState(23);
    const [isValid, setIsValid] = useState(false);
    const [submittedWords, setSubmittedWords] = useState([
        { word: 'Dog', score: 3 },
        { word: 'Mop', score: 10 },
        { word: 'Cat', score: 5 }
    ]);
    const [availableTiles] = useState(['A', 'B', 'X', 'C', 'A', 'D', 'S']);

    const handleTileClick = (letter) => {
        setCurrentWord(currentWord + letter);
    };

    const handleYes = () => {
        // Logic for validating and submitting the word
        console.log('Yes clicked');
    };

    const handleNo = () => {
        setCurrentWord('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Game Area (Left/Center) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Score/Error Message */}
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Score: {score}
                            </h2>
                            {!isValid && (
                                <p className="text-red-500 font-semibold text-lg">Invalid Word</p>
                            )}
                            {isValid && (
                                <p className="text-green-500 font-semibold text-lg">Valid Word!</p>
                            )}
                        </div>

                        {/* Input Form */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex gap-4 items-center justify-center">
                                {/* Word Input */}
                                <input
                                    type="text"
                                    value={currentWord}
                                    onChange={(e) => setCurrentWord(e.target.value)}
                                    className="flex-1 px-6 py-4 text-2xl font-bold text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                                    placeholder="Enter word..."
                                />

                                {/* Yes Button */}
                                <button
                                    onClick={handleYes}
                                    className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xl rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    Yes
                                </button>

                                {/* No Button */}
                                <button
                                    onClick={handleNo}
                                    className="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-bold text-xl rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        {/* Tile Area */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Tiles</h3>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {availableTiles.map((letter, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTileClick(letter)}
                                        className="w-16 h-16 bg-[#ffd493] border-4 border-[#eaaf56] rounded-lg font-bold text-2xl text-gray-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer"
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Submitted Words */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-sky-200">
                                Score: {totalScore}
                            </h2>
                            <div className="space-y-3">
                                {submittedWords.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors duration-200"
                                    >
                                        <span className="font-semibold text-gray-800 text-lg">
                                            {item.word}
                                        </span>
                                        <span className="font-bold text-sky-600 text-lg">
                                            {item.score}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrabbleGame;
