import { createElementFromTemplate } from './common.js';
import { renderThumbnail } from './thumbnail.js';


const TEMPLATE =
    `<ul class="l-video-thumbnail-list"></ul>`;


export function renderThumbnailList(data) {
    const root = createElementFromTemplate(TEMPLATE);

    const itemElements = data.map(item => {
        const li = document.createElement('li');

        li.append(renderThumbnail(item));

        return li;
    });

    root.append(...itemElements);

    return root;
}
