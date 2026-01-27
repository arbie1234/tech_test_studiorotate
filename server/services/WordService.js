class WordService {
    constructor() {
        this.letterScores = require('../config/letterScores.json');
    }

    // Handle score calculation
    calculateScore(word) {
        let score = 0;
        for (let i = 0; i < word.length; i++) {
            const letter = word[i].toUpperCase(); // handle case sensitivity
            const letterScore = this.letterScores.find((score) => score.letter === letter);
            if (letterScore) {
                score += letterScore.points;
            }
        }
        return score;
    }

    // generate a random string
    generateScrabbleString() {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
        const length = Math.floor(Math.random() * 4) + 7;
        let word = '';
        for (let i = 0; i < length; i++) {
            if (i < 2) {
                word += vowels[Math.floor(Math.random() * vowels.length)];
            } else {
                word += consonants[Math.floor(Math.random() * consonants.length)];
            }
        }

        // assign score to each letter
        var str = [];
        for (let i = 0; i < word.length; i++) {
            str.push({
                letter: word[i],
                score: this.calculateScore(word[i])
            });
        }
        return str;
    }
}

module.exports = new WordService();
