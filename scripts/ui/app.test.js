
import { YoutubeSearchService } from '../application/youtube-search-service.js';
import { SnackbarService } from './snack-bar-service.js';
import { App } from './app.js';

jest.mock('../application/youtube-search-service.js');
jest.mock('./snack-bar-service.js');

async function flushMicrotaskQueue() {
    await Promise.resolve();
}

const BODY = `
    <div class="js-carousel"></div>
    <form class="js-search-form">
        <input class="js-search-input" type="search">
        <button type="submit">Submit</button>
    </form>
    <section class="js-video-results"></section>`

describe('App', () => {
    test('shows error when form submit fails', async () => {
        document.body.innerHTML = BODY;

        YoutubeSearchService.mockImplementation(() => {
            return {
                getPopularVideos: jest.fn(() => Promise.resolve([])),
                search: jest.fn(() => Promise.reject())
            };
        });

        const youtubeSearchService = new YoutubeSearchService();
        const snackbarService = new SnackbarService();

        const app = new App(
            document,
            youtubeSearchService,
            snackbarService
        );

        app.start();
        document.querySelector('[type="submit"]').click();
        await flushMicrotaskQueue();

        expect(youtubeSearchService.search).toHaveBeenCalled();
        expect(snackbarService.showError).toHaveBeenCalledWith('Sorry, videos are not loaded :(');
    });
});
