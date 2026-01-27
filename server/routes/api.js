const express = require('express');
const router = express.Router();
const scrabbleController = require('../controllers/ScrabbleController');

router.use('/', scrabbleController);

module.exports = router;
