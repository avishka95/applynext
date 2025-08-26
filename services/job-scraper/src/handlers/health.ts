import { checkPgHealth } from '../db/clients';
import ServiceError from '../errors/ServiceError';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from './asyncHandler';
import { QueryResult } from 'pg';

export async function getHealth(req: Request, res: Response, nxtFn: NextFunction) {
    try {
        const resPgHealth: boolean = await checkPgHealth();
        if (!resPgHealth) {
            throw new ServiceError('PostgreSQL DB is not healthy', 500);
        }

        res.status(200).json({ status: 'OK' });
    } catch (error) {
        nxtFn(error);
    }
}
