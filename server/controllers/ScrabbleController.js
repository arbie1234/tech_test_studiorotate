const express = require('express');
const wordService = require('../services/WordService');
const dictionaryApiService = require('../services/DictionaryApiService');

class ScrabbleController {
    constructor() {
        this.router = express.Router();
        this.dictionaryApiService = dictionaryApiService;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/scrabble-score', this.getWordScore.bind(this));
    }

    getWordScore(req, res) {
        const { word } = req.query;

        // validate word
        const isValidWord = this.dictionaryApiService.validateWord(word);
        if (!isValidWord) {
            return res.status(400).json({ error: 'Invalid word' });
        }

        const score = wordService.calculateScore(word);
        res.json({ word, score });
    }
}

module.exports = new ScrabbleController().router;
