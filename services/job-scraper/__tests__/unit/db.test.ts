import { pgPool, healthCheck } from '@/db/clients';

afterAll(async () => {
    await pgPool.end();
});

describe('check health of Postgres DB', () => {
    it('should return the current time from the database', async () => {
        const result = healthCheck();
        expect(result).resolves.toHaveProperty('now');
    });
});
