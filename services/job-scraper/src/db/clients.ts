import config from '../config';
import ServiceError from '../errors/ServiceError';
import { Pool as PgPool, QueryResult as PgQueryResult } from 'pg';

export const pgPool = new PgPool({
    connectionString: config.postgreDatabaseUrl
});

/**
 * Checks the health of the PostgreSQL database by executing a simple query.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the database responds successfully, otherwise throws a ServiceError.
 * @throws {ServiceError} If the health check query fails or the database is unreachable.
 */
export async function checkPgHealth(): Promise<boolean> {
    try {
        const res: PgQueryResult<{ now: string }> = await pgPool.query('SELECT NOW()');
        return Boolean(res.rows[0]?.now);
    } catch (error) {
        throw new ServiceError('Database health check failed for PostgreSQL DB', 500);
    }
}

/**
 * Executes a SQL query using the PostgreSQL connection pool.
 *
 * @param text - The SQL query string to execute.
 * @param params - Optional array of parameters to be used in the SQL query.
 * @returns A promise that resolves to the result of the query.
 */
export const queryPg = (text: string, params?: any[]) => {
    return pgPool.query(text, params);
};

/**
 * Gracefully shuts down the PostgreSQL connection pool by closing all idle clients.
 * Logs a message to the console once the pool has been closed.
 *
 * @returns {Promise<void>} A promise that resolves when the pool has been closed.
 */
async function shutdown(): Promise<void> {
    await pgPool.end(); // closes all idle clients
    console.log('PostgreSQL pool has been closed.');
}

// process.on('SIGINT', shutdown); // Ctrl+C
// process.on('SIGTERM', shutdown); // Kill signal
