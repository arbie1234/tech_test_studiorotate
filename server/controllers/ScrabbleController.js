const express = require('express');
const wordService = require('../services/WordService');

class ScrabbleController {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/scrabble-score', this.getWordScore.bind(this));
    }

    getWordScore(req, res) {
        const { word } = req.query;
        const score = wordService.calculateScore(word);
        res.json({ word, score });
    }
}

module.exports = new ScrabbleController().router;
