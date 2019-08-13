import { createElementFromTemplate } from './common.js';


const TEMPLATE = 
    `<div class="video-thumbnail">
      
        <div class="video-thumbnail-image">
            <img class="js-video-image">
        </div>
        <div class="video-thumbnail-info">
            <h3 class="js-video-title video-title"></h3>
            <div class="video-metadata">
                <div class="js-video-channel video-channel"></div>
                <div class="js-video-load-date video-load-date"></div>
            </div>
        </div>
    </div>`;


export function renderThumbnail(data) {
    const root = createElementFromTemplate(TEMPLATE);

    const imageElement = root.querySelector('.js-video-image');
    const titleElement = root.querySelector('.js-video-title');
    const channelElement = root.querySelector('.js-video-channel');
    const dateElement = root.querySelector('.js-video-load-date');

    imageElement.src = data.imageUrl;
    titleElement.textContent = data.title;
    channelElement.textContent = data.channel;
    dateElement.textContent = data.publishedAt;

    return root;
}
