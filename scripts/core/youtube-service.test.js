import { YoutubeService } from "./youtube-service.js";
import { ServiceError } from "./errors.js";


const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyCHQSW683F3Nkt2mylZKp0JtFfBDbjVv7w';

const OPTIONS = {
    method: 'GET',
    headers: { 
        'Accept': 'application/json'
    }
};

describe('YoutubeService', () => {
    describe('constructor', () => {
        test('creats instance without callback running', () => {
            const fetchMock = jest.fn();

            new YoutubeService(fetchMock, BASE_URL, API_KEY);

            expect(fetchMock.mock.calls.length).toBe(0);
        });

        test('throws an error when fetchMock not provided', () => {
            expect(() => new YoutubeService(null, BASE_URL, API_KEY))
                .toThrow('fetchFn is not provided.');
        });

        test('throws an error when baseUrl not provided', () => {
            const fetchMock = jest.fn();

            expect(() => new YoutubeService(fetchMock, null, API_KEY))
                .toThrow('baseUrl is not provided.');
        });

        test('throws an error when apiKey not provided', () => {
            const fetchMock = jest.fn();

            expect(() => new YoutubeService(fetchMock, BASE_URL, null))
                .toThrow('apiKey is not provided.');
        });
    });

    describe('search', () => {
        test('calls callback with correct arguments', () => {
            const fetchMock = jest.fn();
            const service = new YoutubeService(fetchMock, BASE_URL, API_KEY);

            service.search('raccoon');

            expect(fetchMock.mock.calls.length).toBe(1);
            expect(fetchMock.mock.calls[0][0]).toBe(`${BASE_URL}/search?part=snippet&maxResults=25&key=${API_KEY}&q=raccoon`);
            expect(fetchMock.mock.calls[0][1]).toEqual(OPTIONS);
        });

        test('throws an error when response is rejected', async (done) => {
            const fetchMock = jest.fn(() => Promise.reject());
            const service = new YoutubeService(fetchMock, BASE_URL, API_KEY);

            try {
                await service.search('raccoon');
            } catch(error) {
                expect(error)
                    .toEqual(new ServiceError('Can not get videos.'));
                done();
            }
        });

        // TODO check error message for Error
        test('throws an error when response status is not OK', async (done) => {
            const fetchMock = jest.fn(() => Promise.resolve({
                ok: false,
                status: 500
            }));
            const service = new YoutubeService(fetchMock, BASE_URL, API_KEY);

            try {
                await service.search('raccoon');
            } catch(error) {
                expect(error)
                    .toEqual(new ServiceError('Can not get videos.', new Error('Response is not OK. HTTP error, status = 500')));
                done();
            }
        });

        test('throws an error when cannot parse JSON', async (done) => {
            const fetchMock = jest.fn(() => Promise.resolve({
                ok: true,
                json: () => Promise.reject()
            }));
            const service = new YoutubeService(fetchMock, BASE_URL, API_KEY);

            try {
                await service.search('raccoon');
            } catch(error) {
                expect(error).toEqual(new ServiceError('Can not get videos.'));
                done();
            }
        });
    });
});
