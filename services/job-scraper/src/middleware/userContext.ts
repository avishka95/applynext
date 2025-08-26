import { NextFunction, Request, Response } from 'express';

interface UserContext {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            userContext?: UserContext;
        }
    }
}

/**
 * Express middleware that extracts the `x-user-id` header from the incoming request
 * and attaches it to the response object as `userContext`. If the header is present,
 * `res.userContext` will be set to an object containing the `userId`.
 *
 * @param res - The Express request object.
 * @param _res - The Express response object (unused).
 * @param nextFn - The next middleware function in the stack.
 */
export function userContext(res: Request, _res: Response, nextFn: NextFunction) {
    const userId = res.header('x-user-id');
    if (userId) {
        res.userContext = { userId };
    }

    nextFn();
}
