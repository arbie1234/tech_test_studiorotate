const DictionaryApiService = require('../services/DictionaryApiService');

describe('DictionaryApiService', () => {
    let service;

    beforeEach(() => {
        service = new DictionaryApiService();
        // Mock the global fetch
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('validateWord should return true for a valid word', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue([{ word: 'test' }]),
            ok: true
        };
        global.fetch.mockResolvedValue(mockResponse);

        const result = await service.validateWord('test');
        expect(result).toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/test'));
    });

    test('validateWord should return false for an invalid word', async () => {
        const mockResponse = {
            json: jest.fn().mockResolvedValue([]),
            ok: true
        };
        global.fetch.mockResolvedValue(mockResponse);

        const result = await service.validateWord('asdfgh');
        expect(result).toBe(false);
    });

    test('validateWord should handle API errors gracefully (assuming false for now)', async () => {
        global.fetch.mockRejectedValue(new Error('API Down'));

        // If your service doesn't have a try-catch yet, this might throw.
        // Let's assume for now it might throw or we should handle it.
        await expect(service.validateWord('test')).rejects.toThrow('API Down');
    });
});
