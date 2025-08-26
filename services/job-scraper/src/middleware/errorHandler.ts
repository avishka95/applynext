import { Request, Response, NextFunction } from 'express';
import AppError, { HttpStatusServerError } from '@/errors/ServiceError';
import logger from '@/utils/logger';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response<{ status: string; message?: string }> {
    logger.error(err.message);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message || 'An error occurred'
        });
    }

    return res.status(HttpStatusServerError.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error'
    });
}
