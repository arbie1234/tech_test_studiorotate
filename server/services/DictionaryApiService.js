class DictionaryApiService {
    constructor() {
        this.apiKey = process.env.DICTIONARY_API_KEY;
    }

    // check if word exists in dictionary
    async validateWord(word) {
        const response = await fetch(`${this.apiKey}/api/v2/entries/en/${word}`);
        const data = await response.json();
        return data.length > 0;
    }
}

module.exports = DictionaryApiService;