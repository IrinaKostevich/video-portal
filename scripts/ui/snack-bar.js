import { createElementFromTemplate } from './common.js';

const TEMPLATE = `
    <div class="js-snack-bar snack-bar">
        <p class="js-snack-bar-text snack-bar-text"></p>
    </div>`;

export function renderSnackbar(message) {
    const root = createElementFromTemplate(TEMPLATE);

    const snackbarText = root.querySelector('.js-snack-bar-text');
    snackbarText.textContent = message;

    return root;
}
