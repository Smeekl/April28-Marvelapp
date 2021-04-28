import { NextFunction, Request, Response } from 'express';
import { ErrorHandlerType } from '../types/error.type';
import UnauthorizedException from '../exceptions/unauthorized.exeption';

class ErrorMiddleware {
    public use = (
        error: ErrorHandlerType,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        switch (error.status) {
            case 401:
                return response.status(error.status).send(error.message).end();
        }

        return response.status(error.status).send(error.message).end();
        next();
    };
}

export default new ErrorMiddleware();
