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

export const queryPg = (text: string, params?: any[]) => {
    return pgPool.query(text, params);
};

async function shutdown() {
    await pgPool.end(); // closes all idle clients
    console.log('PostgreSQL pool has been closed.');
}

process.on('SIGINT', shutdown); // Ctrl+C
process.on('SIGTERM', shutdown); // Kill signal
