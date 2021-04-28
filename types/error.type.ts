import HttpException from '../exceptions/http.exeption';
import UnauthorizedException from '../exceptions/unauthorized.exeption';

export type ErrorHandlerType = HttpException | UnauthorizedException;
