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
}

module.exports = new WordService();
