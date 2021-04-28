class ApplicationError extends Error {
    constructor(public readonly status: number, public readonly message: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.message = message || 'Something went wrong. Please try again.';
        this.status = status;
    }
}

export default ApplicationError;
