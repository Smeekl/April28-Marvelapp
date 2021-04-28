import ApplicationError from './application.error';

class HttpException extends ApplicationError {
    constructor(public readonly status: number, public readonly message: string) {
        super(status, message);
    }
}

export default HttpException;
