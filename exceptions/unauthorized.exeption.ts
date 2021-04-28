import ApplicationError from './application.error';

class UnauthorizedException extends ApplicationError {
    constructor(public readonly message: string) {
        super(401, message);
    }
}

export default UnauthorizedException;
