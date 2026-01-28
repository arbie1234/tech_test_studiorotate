import React, { useState } from 'react';
import MiniWordTiles from './components/MiniWordTiles';
import ScrabbleTile from './components/ScrabbleTile';

const ScrabbleGame = () => {
    // Sample state for demonstration
    const [currentWord, setCurrentWord] = useState('SAD');
    const [score, setScore] = useState(6);
    const [totalScore, setTotalScore] = useState(23);
    const [isValid, setIsValid] = useState(false);
    const [status, setStatus] = useState('success'); // 'success', 'fail', or null
    const [submittedWords, setSubmittedWords] = useState([
        { word: 'Dog', score: 3 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Mop', score: 10 },
        { word: 'Cat', score: 5 }
    ]);
    const [availableTiles] = useState([
        { letter: 'A', score: 1 },
        { letter: 'I', score: 1 },
        { letter: 'M', score: 3 },
        { letter: 'X', score: 8 },
        { letter: 'R', score: 1 },
        { letter: 'H', score: 4 },
        { letter: 'L', score: 1 },
        { letter: 'F', score: 4 }
    ]);

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
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
            <div className="flex h-screen">
                {/* Left Section - Input and Tiles */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-2xl">
                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="mb-4 p-4 bg-green-100 border-2 border-green-600 rounded-lg animate-bounce-in">
                                <p className="text-green-700 font-semibold text-center text-lg">
                                    ✓ Word accepted! +{score} points
                                </p>
                            </div>
                        )}
                        {status === 'fail' && (
                            <div className="mb-4 p-4 bg-red-100 border-2 border-red-600 rounded-lg animate-shake">
                                <p className="text-red-700 font-semibold text-center text-lg">
                                    ✗ Invalid word. Try again!
                                </p>
                            </div>
                        )}

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
                                    className="px-8 py-4 bg-green-500 hover:bg-sky-600 text-white font-bold text-xl rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    ✓
                                </button>

                                {/* No Button */}
                                <button
                                    onClick={handleNo}
                                    className="px-8 py-4 bg-red-400 hover:bg-gray-500 text-white font-bold text-xl rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    ✘
                                </button>
                            </div>
                        </div>

                        {/* Tile Area - Directly Below Input */}
                        <div className="mt-6">
                            <div className="flex flex-wrap gap-3 justify-center bg-slate-200 py-4 px-3 rounded-xl shadow-md">
                                {availableTiles.map((tile, index) => (
                                    <ScrabbleTile
                                        key={index}
                                        letter={tile.letter}
                                        text={tile.score}
                                        onClick={() => handleTileClick(tile.letter)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Sidebar with Scrollable Score Table */}
                <div className="w-1/3 p-4 pr-8">
                    <div className="bg-slate-600 rounded-lg shadow-md p-6 h-full flex flex-col max-h-[calc(100vh-32px)]">
                        <h2 className="text-2xl font-bold text-white mb-4 pb-3 border-b-2 border-sky-200">
                            Score: {totalScore}
                        </h2>
                        <div className="space-y-3 flex-1 overflow-y-scroll">
                            {submittedWords.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 bg-sky-100 rounded-lg hover:bg-sky-200 transition-colors duration-200 mr-2"
                                >
                                    <div className="flex-1">
                                        <MiniWordTiles word={item.word} />
                                    </div>
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
    );
};

export default ScrabbleGame;
