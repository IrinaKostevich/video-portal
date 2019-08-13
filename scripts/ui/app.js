import { renderThumbnailList } from './thumbnail-list.js';
import { mountTo } from './common.js';
import { renderCarousel } from './carousel.js';

export class App {
    constructor(document, youtubeSearchService, snackbarService) {
        this._document = document;
        this._youtubeSearchService = youtubeSearchService;
        this._snackbarService = snackbarService;
    }

    async start() {
        const searchForm = this._document.querySelector('.js-search-form');
        const carouselContainer = this._document.querySelector('.js-carousel');

        searchForm.addEventListener('submit', this.onSearchSubmit.bind(this));

        const popularData = await this._youtubeSearchService.getPopularVideos();
        const carousel = renderCarousel(popularData);
        mountTo(carouselContainer, carousel);
    }

    async onSearchSubmit(event) {
        event.preventDefault();

        const videoResultsSection = this._document.querySelector('.js-video-results');
        const searchInput = this._document.querySelector('.js-search-input');

        try {
            const queryText = searchInput.value;
            const videosData = await this._youtubeSearchService.search(queryText);

            const thumbnailList = renderThumbnailList(videosData);
            mountTo(videoResultsSection, thumbnailList);

            this._snackbarService.showSuccess('Videos are loaded :)');
        } catch (err) {
            this._snackbarService.showError('Sorry, videos are not loaded :(');
        }
    }
}