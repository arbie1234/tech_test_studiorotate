class DictionaryApiService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_DICTIONARY_API_ENDPOINT;
    }

    // check if word exists in dictionary
    async validateWord(word) {
        const response = await fetch(`${this.baseUrl}/api/v2/entries/en/${word}`);
        const data = await response.json();
        return data.length > 0;
    }
}

module.exports = DictionaryApiService;