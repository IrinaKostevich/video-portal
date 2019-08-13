import { calculateDateFromNow } from "../core/date-utils.js";

export class YoutubeSearchService {
    constructor(youtubeService) {
        if (!youtubeService) throw new Error('youtubeService is not provided.')

        this._youtubeService = youtubeService;
    }

    async search(query) {
        const response = await this._youtubeService.search(query);
        const videosData = response.items
            .map((item) => {
                return {
                    title: item.snippet.title,
                    channel: item.snippet.channelTitle,
                    imageUrl: item.snippet.thumbnails.medium.url,
                    publishedAt: calculateDateFromNow(item.snippet.publishedAt)
                }
            });

        return videosData;
    }

    async getPopularVideos() {
        const response = await this._youtubeService.getPopularVideos();
        const popularData = response.items
            .map((item) => {
                return {
                    title: item.snippet.title,
                    imageUrl: item.snippet.thumbnails.high.url
                }
            });

        return popularData;
    }
}
