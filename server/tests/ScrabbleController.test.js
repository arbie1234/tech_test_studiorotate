const { ScrabbleController } = require('../controllers/ScrabbleController');
const wordService = require('../services/WordService');
const DictionaryApiService = require('../services/DictionaryApiService');

// Mock the services
jest.mock('../services/WordService');
jest.mock('../services/DictionaryApiService');

describe('ScrabbleController', () => {
    let controller;
    let mockReq;
    let mockRes;

    beforeEach(() => {
        controller = new ScrabbleController();
        mockReq = {
            query: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getWordScore should return 400 if word is invalid', async () => {
        mockReq.query.word = 'invalid';

        // Mock DictionaryApiService.prototype.validateWord
        DictionaryApiService.prototype.validateWord.mockResolvedValue(false);

        await controller.getWordScore(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid word' });
    });

    test('getWordScore should return score if word is valid', async () => {
        mockReq.query.word = 'apple';

        DictionaryApiService.prototype.validateWord.mockResolvedValue(true);
        wordService.calculateScore.mockReturnValue(9);

        await controller.getWordScore(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({ word: 'apple', score: 9 });
    });
});
