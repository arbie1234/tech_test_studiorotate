const express = require('express');
const wordService = require('../services/WordService');
const dictionaryApiService = require('../services/DictionaryApiService');

class ScrabbleController {
    constructor() {
        this.router = express.Router();
        this.dictionaryApiService = new dictionaryApiService();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/scrabble-score', this.getWordScore.bind(this));
        this.router.get('/scrabble-string', this.generateScrabbleString.bind(this));
    }

    async getWordScore(req, res) {
        const word = req.body.word;

        // validate if word is empty
        if (!word) {
            return res.status(400).json({ error: 'Word is required' });
        }

        // validate if word contains only letters
        if (!/^[a-zA-Z]+$/.test(word)) {
            return res.status(400).json({ error: 'Word must contain only letters' });
        }

        // validate if word exist in dictionary
        const isValidWord = await this.dictionaryApiService.validateWord(word);
        if (!isValidWord) {
            return res.status(400).json({ error: 'Invalid word' });
        }

        const score = wordService.calculateScore(word);
        res.json({ word, score });
    }

    async generateScrabbleString(req, res) {
        const scrabbleString = wordService.generateScrabbleString();
        res.json({ scrabbleString });
    }
}

module.exports = {
    router: new ScrabbleController().router,
    ScrabbleController
};
