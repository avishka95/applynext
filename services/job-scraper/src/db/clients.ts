import config from '@/config';
import { Pool } from 'pg';

export const pgPool = new Pool({
    connectionString: config.postgreDatabaseUrl
});

export const healthCheck = async () => {
    try {
        const res = await pgPool.query('SELECT NOW()');
        return res.rows[0];
    } catch (error) {
        console.error('Database health check failed:', error);
        throw error;
    }
};

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
async function shutdown() {
    await pgPool.end(); // closes all idle clients
    console.log('PostgreSQL pool has been closed.');
}

process.on('SIGINT', shutdown); // Ctrl+C
process.on('SIGTERM', shutdown); // Kill signal
