import { createElementFromTemplate } from './common.js';
import { renderCarouselItem } from './carousel-item.js';

const TEMPLATE = `
    <div class="carousel">
        <button class="js-carousel-prev carousel-btn carousel-btn--prev"><i class="fas fa-chevron-left"></i></button>
        <button class="js-carousel-next carousel-btn carousel-btn--next"><i class="fas fa-chevron-right"></i></button>
        <div class="js-carousel-content carousel-content">
            <ol class="js-carousel-list carousel-list"></ol>
        </div>
    </div>`;


export function renderCarousel(data) {
    const root = createElementFromTemplate(TEMPLATE);
    const state = {
        currentIndex: 0,
        data
    };

    const carouselList = root.querySelector('.js-carousel-list');
    const carouselPrevButton = root.querySelector('.js-carousel-prev');
    const carouselNextButton = root.querySelector('.js-carousel-next');

    const carouselItems = data.map(renderCarouselItem);

    carouselList.append(...carouselItems);

    carouselPrevButton.addEventListener('click', onCarouselPrev.bind({root, state}));
    carouselNextButton.addEventListener('click', onCarouselNext.bind({root, state}));

    rerender.call({root, state});

    return root;
}

function rerender() {
    changeSlide.call(this);
    updatePrevButton.call(this);
    updateNextButton.call(this);
}

function updatePrevButton() {
    const carouselPrevButton = this.root.querySelector('.js-carousel-prev');

    carouselPrevButton.disabled = this.state.currentIndex === 0;
}

function updateNextButton() {
    const carouselNextButton = this.root.querySelector('.js-carousel-next');

    carouselNextButton.disabled = this.state.currentIndex === this.state.data.length - 1;
}

function changeSlide() {
    const carouselContent = this.root.querySelector('.js-carousel-content');
    const transformValue = this.state.currentIndex * 100;
    carouselContent.style = `transform: translateX(${-transformValue}%);`;
}

function onCarouselPrev() {
    this.state.currentIndex -= 1;
    rerender.call(this);
}

function onCarouselNext() {
    this.state.currentIndex += 1;
    rerender.call(this);
}
