import { createElementFromTemplate } from './common.js';

const TEMPLATE = `
    <li class="carousel-item">
        <img class="js-item-image">
        <h3 class="js-item-title carousel-item-header"></h3>
    </li>`;


export function renderCarouselItem(data) {
    const root = createElementFromTemplate(TEMPLATE);

    const itemTitle = root.querySelector('.js-item-title');
    const itemImage = root.querySelector('.js-item-image');

    itemTitle.textContent = data.title;
    itemImage.src = data.imageUrl;

    return root;
}
