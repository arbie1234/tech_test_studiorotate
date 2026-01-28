import React, { useState } from 'react';
import MiniWordTiles from './components/MiniWordTiles';
import ScrabbleTile from './components/ScrabbleTile';
import { useEffect } from 'react';


const ScrabbleGame = () => {
    // Sample state for demonstration
    const [selectedTileIndices, setSelectedTileIndices] = useState([]);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [status, setStatus] = useState(''); // fail, success or null
    const [submittedWords, setSubmittedWords] = useState([]);
    const [availableTiles, setAvailableTiles] = useState([]);
    const [isTileAreaShaking, setisTileAreaShaking] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchTiles();
    }, []);

    useEffect(() => {
        if (score > 0) {
            showSuccessMessage();
        }
    }, [score])

    useEffect(() => {
        if (errorMessage) {
            showErrorMessage();
        }
    }, [errorMessage])

    const fetchTiles = async () => {
        try {
            const response = await fetch(`${API_URL}/api/scrabble-string`);
            const data = await response.json();
            setAvailableTiles(data.scrabbleString);
        } catch (error) {
            console.error('Error fetching tiles:', error);
        }
    };

    const triggerShake = () => {
        setisTileAreaShaking(true);
        setTimeout(() => setisTileAreaShaking(false), 500);
    };

    const currentWord = selectedTileIndices.map(i => availableTiles[i]?.letter).join('') || '';

    const handleTileClick = (letter, index) => {
        if (selectedTileIndices.includes(index)) {
            // remove the index
            setSelectedTileIndices(prev => prev.filter(i => i !== index));
        } else {
            // add the index
            if (selectedTileIndices.length < availableTiles.length) {
                setSelectedTileIndices(prev => [...prev, index]);
            } else {
                triggerShake();
            }
        }
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value.toUpperCase();

        // remove the last index
        if (newValue.length < currentWord.length) {
            setSelectedTileIndices(prev => prev.slice(0, -1));
            return;
        }

        const newChars = newValue.slice(currentWord.length).split('');
        let currentIndices = [...selectedTileIndices];
        let isValid = true;

        for (const char of newChars) {
            if (!/^[A-Z]$/.test(char)) {
                isValid = false;
                break;
            }
            const foundIndex = availableTiles.findIndex((t, i) =>
                t.letter.toUpperCase() === char && !currentIndices.includes(i)
            );
            if (foundIndex !== -1) {
                currentIndices.push(foundIndex);
            } else {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            setSelectedTileIndices(currentIndices);
        } else {
            triggerShake();
        }
    };

    const handleSubmit = async () => {
        // check if word already submitted
        if (submittedWords.some(w => w.word === currentWord)) {
            setErrorMessage('You already submitted this word');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch(`${API_URL}/api/scrabble-score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: currentWord }),
            });
            const data = await response.json();
            setIsSubmitting(false);
            if (data.error) {
                setErrorMessage(data.error);
                return;
            }
            setScore(data.score);
            setTotalScore(prev => prev + data.score);
            setSubmittedWords(prev => [...prev, {
                word: currentWord,
                score: data.score
            }]);
            setAvailableTiles([]);
            setSelectedTileIndices([]);
            fetchTiles();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClear = () => {
        setSelectedTileIndices([]);
    };

    const showErrorMessage = () => {
        setStatus('fail');
        setTimeout(() => {
            setStatus(null);
        }, 3000);
    };

    const showSuccessMessage = () => {
        setStatus('success');
        setTimeout(() => {
            setStatus(null);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
            <div className="flex h-screen">
                {/* Left Section - Input and Tiles */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-2xl relative">
                        {/* Status Messages */}
                        <div className="absolute -top-20 left-0 right-0 z-50 pointer-events-none">
                            {status === 'success' && (
                                <div className="p-4 bg-green-100 border-2 border-green-600 rounded-lg animate-bounce-in shadow-lg pointer-events-auto">
                                    <p className="text-green-700 font-semibold text-center text-lg">
                                        ✓ Word accepted! +{score} points
                                    </p>
                                </div>
                            )}
                            {status === 'fail' && (
                                <div className="p-4 bg-red-100 border-2 border-red-600 rounded-lg animate-shake shadow-lg pointer-events-auto">
                                    <p className="text-red-700 font-semibold text-center text-lg">
                                        ✗ {errorMessage}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Input Form */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex gap-4 items-center justify-center">
                                {/* Word Input */}
                                <input
                                    type="text"
                                    value={currentWord}
                                    onChange={handleInputChange}
                                    className="flex-1 px-6 py-4 text-2xl font-bold text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                                    placeholder="Enter word..."
                                />

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    ✓
                                </button>

                                {/* Clear Button */}
                                <button
                                    onClick={handleClear}
                                    className="px-8 py-4 bg-red-400 hover:bg-gray-500 text-white font-bold text-xl rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    ✘
                                </button>
                            </div>
                        </div>

                        {/* Tile Area - Directly Below Input */}
                        <div className="mt-6">
                            <div className={`flex flex-wrap gap-3 justify-center bg-slate-200 py-4 px-3 rounded-xl shadow-md ${isTileAreaShaking ? 'animate-shake' : ''}`}>
                                {availableTiles.map((tile, index) => (
                                    <ScrabbleTile
                                        key={index}
                                        letter={tile.letter}
                                        text={tile.score}
                                        isDisabled={selectedTileIndices.includes(index)}
                                        onClick={() => handleTileClick(tile.letter, index)}
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
                        <div className="space-y-3 flex-1 overflow-y-auto">
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
