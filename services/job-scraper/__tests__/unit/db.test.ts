import { pgPool, checkPgHealth } from '@/db/clients';

afterAll(async () => {
    await pgPool.end();
});

describe('check health of Postgres DB', () => {
    it('should return true if the database is healthy', async () => {
        const result = checkPgHealth();
        expect(result).resolves.toBe(true);
    });
});
