export class ServiceError extends Error {
    constructor(message, error = null) {
        super(message);
        this.name = 'ServiceError';
        this.error = error;
    }
}
