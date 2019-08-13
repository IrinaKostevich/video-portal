import { ServiceError } from "./errors.js";

const PART = 'snippet';
const POPULAR_PARTS = ['snippet', 'contentDetails', 'statistics'];
const MAXRESULTS = 25;

export class YoutubeService {
    constructor(fetchFn, baseUrl, apiKey) {
        if (!fetchFn) throw new Error('fetchFn is not provided.');
        if (!baseUrl) throw new Error('baseUrl is not provided.');
        if (!apiKey) throw new Error('apiKey is not provided.');

        this._fetchFn = fetchFn;
        this._baseUrl = baseUrl;
        this._apiKey = apiKey;
    }

    async search(query) {
        const encodedQuery = encodeURIComponent(query);
        const url = `${this._baseUrl}/search?part=${PART}&maxResults=${MAXRESULTS}&key=${this._apiKey}&q=${encodedQuery}`;

        try {
            const response = await this._fetchFn(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Response is not OK. HTTP error, status = ' + response.status);
            }

            const body = await response.json();

            return body;
        } catch (err) {
            throw new ServiceError('Can not get videos.', err);
        }
    }

    async getPopularVideos() {
        const parts = encodeURIComponent(POPULAR_PARTS.join(','));
        const url = `${this._baseUrl}/videos?part=${parts}&chart=mostPopular&key=${this._apiKey}`;

        try {
            const response = await this._fetchFn(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Response is not OK. HTTP error, status = ' + response.status);
            }

            const body = await response.json();

            return body;
        } catch (err) {
            throw new ServiceError('Can not get videos.', err);
        }
    }
}
