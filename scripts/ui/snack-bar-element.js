const TEMPLATE = `
    <div class="snack-bar">
        <p class="js-snack-bar-text snack-bar-text"></p>
    </div>`;


export class SnackBarElement extends HTMLElement {
    constructor() {
        super();
        this._isConnected = false;
    }

    static get observedAttributes() {
        return ['message', 'type'];
    }

    get message() {
        return this.getAttribute('message');
    }

    set message(value) {
        this.setAttribute('message', value);
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (!this._isConnected) return;
        this._update();
    }

    connectedCallback() {
        this.innerHTML = TEMPLATE;
        this._update();
        this._isConnected = true;
    }

    _update() {
        const snackbarText = this.querySelector('.js-snack-bar-text');
        snackbarText.textContent = this.message;

        this.firstElementChild.classList.remove('snack-bar--success', 'snack-bar--error');
        this.firstElementChild.classList.add(`snack-bar--${this.type}`);
    }
}
