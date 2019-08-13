const DEFAULT_TIMEOUT = 4000;

export class SnackbarService {
    constructor(document) {
        if (!document) throw new Error('document is not provided.');

        this._document = document;
    }

    showSuccess(message) {
        const snackbar = document.createElement('snack-bar');
        snackbar.classList.add('snack-bar--show');
        snackbar.message = message;
        snackbar.type = 'success';
        document.body.append(snackbar);

        this._clearSnackbarAfterTimeout(snackbar);
    }

    showError(message) {
        const snackbar = document.createElement('snack-bar');
        snackbar.classList.add('snack-bar--show');
        snackbar.message = message;
        snackbar.type = 'error';
        document.body.append(snackbar);

        this._clearSnackbarAfterTimeout(snackbar);
    }

    _clearSnackbarAfterTimeout(snackbar) {
        setTimeout(() => {
            snackbar.classList.add('snack-bar--hide');
            snackbar.addEventListener("animationend", () => {
                snackbar.remove();
            });
        }, DEFAULT_TIMEOUT);
    }
}
