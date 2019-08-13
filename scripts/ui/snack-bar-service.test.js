import { SnackbarService } from "./snack-bar-service";

describe('SnackbarService', () => {
    describe('constructor', () => {
        test('throws an error when document is not provided', () => {
            expect(() => new SnackbarService()).toThrow('document is not provided.');
        });
    });

    describe('showSuccess', () => {
        test('shows correct Success message', () => {
            jest.useFakeTimers();
            const snackbarService = new SnackbarService(document);
            snackbarService.showSuccess('Success');

            expect(document.body.lastElementChild).toBeDefined();
            expect(document.body.lastElementChild.textContent.trim()).toBe('Success');

            jest.runAllTimers();
        });

        test('hides after timeout', () => {
            jest.useFakeTimers();

            const snackbarService = new SnackbarService(document);
            snackbarService.showSuccess('Success');

            jest.runAllTimers();
            expect(document.body.lastElementChild).toBeNull();
        });
    });
});
