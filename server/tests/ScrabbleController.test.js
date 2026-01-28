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
            body: {},
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

    describe('getWordScore', () => {
        test('should return 400 if word is missing in req.body', async () => {
            mockReq.body.word = '';

            await controller.getWordScore(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Word is required' });
        });

        test('should return 400 if word contains non-letters', async () => {
            mockReq.body.word = 'apple123';

            await controller.getWordScore(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Word must contain only letters' });
        });

        test('should return 400 if word is invalid in dictionary', async () => {
            mockReq.body.word = 'notaword';

            DictionaryApiService.prototype.validateWord.mockResolvedValue(false);

            await controller.getWordScore(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid word. Try again!' });
        });

        test('should return score if word is valid', async () => {
            mockReq.body.word = 'apple';

            DictionaryApiService.prototype.validateWord.mockResolvedValue(true);
            wordService.calculateScore.mockReturnValue(9);

            await controller.getWordScore(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({ word: 'apple', score: 9 });
        });
    });

    describe('generateScrabbleString', () => {
        test('should return generated scrabble string from service', async () => {
            const mockString = [{ letter: 'A', score: 1 }];
            wordService.generateScrabbleString.mockReturnValue(mockString);

            await controller.generateScrabbleString(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({ scrabbleString: mockString });
        });
    });
});
