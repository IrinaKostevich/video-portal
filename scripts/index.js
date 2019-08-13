import { YoutubeService } from './core/youtube-service.js';
import { YoutubeSearchService } from './application/youtube-search-service.js';
import { App } from './ui/app.js';
import { config } from './config.js';
import { SnackbarService } from './ui/snack-bar-service.js';
import { SnackBarElement } from './ui/snack-bar-element.js';

customElements.define('snack-bar', SnackBarElement);

document.addEventListener('DOMContentLoaded', () => {
    const youtubeService = new YoutubeService(fetch.bind(window), config.baseUrl, config.apiKey);
    const youtubeSearchService = new YoutubeSearchService(youtubeService);
    const snackbarService = new SnackbarService(document);
    const app = new App(document, youtubeSearchService, snackbarService);

    app.start();
});
