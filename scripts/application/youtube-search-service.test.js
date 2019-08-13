import { YoutubeSearchService } from "./youtube-search-service";

describe('YoutubeSearchService', () => {
    describe('constructor', () => {
        test('throws an error when youtubeService not provided', () => {
            expect(() => new YoutubeSearchService())
                .toThrow('youtubeService is not provided.');
        });
    });
});
