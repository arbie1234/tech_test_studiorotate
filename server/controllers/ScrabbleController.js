const express = require('express');
const wordService = require('../services/WordService');

class ScrabbleController {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
    }
}

module.exports = new ScrabbleController().router;
