const wordService = require('../services/WordService');

describe('WordService', () => {
    describe('calculateScore', () => {
        test('should calculate the correct score for a simple word', () => {
            const score = wordService.calculateScore('apple');
            // A: 1, P: 3, P: 3, L: 1, E: 1 = 9
            expect(score).toBe(9);
        });

        test('should handle case sensitivity', () => {
            const scoreLower = wordService.calculateScore('apple');
            const scoreUpper = wordService.calculateScore('APPLE');
            const scoreMixed = wordService.calculateScore('ApPlE');

            expect(scoreLower).toBe(9);
            expect(scoreUpper).toBe(9);
            expect(scoreMixed).toBe(9);
        });

        test('should return 0 for an empty string', () => {
            const score = wordService.calculateScore('');
            expect(score).toBe(0);
        });

        test('should ignore characters not in the score list', () => {
            const score = wordService.calculateScore('apple!');
            // '!' is not in the list, so it should be ignored
            expect(score).toBe(9);
        });

        test('should calculate the correct score for a word with high-value letters', () => {
            const score = wordService.calculateScore('quiz');
            // Q: 10, U: 1, I: 1, Z: 10 = 22
            expect(score).toBe(22);
        });
    });

    describe('generateScrabbleString', () => {
        test('should return an array of objects with correct length (7-10)', () => {
            const result = wordService.generateScrabbleString();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(7);
            expect(result.length).toBeLessThanOrEqual(10);
        });

        test('should have objects with letter and score properties', () => {
            const result = wordService.generateScrabbleString();
            result.forEach(item => {
                expect(item).toHaveProperty('letter');
                expect(item).toHaveProperty('score');
                expect(typeof item.letter).toBe('string');
                expect(typeof item.score).toBe('number');
            });
        });

        test('should have correct scores for each letter', () => {
            const result = wordService.generateScrabbleString();
            result.forEach(item => {
                const expectedScore = wordService.calculateScore(item.letter);
                expect(item.score).toBe(expectedScore);
            });
        });
    });
});
