import request from 'supertest';
import service from '@/service';

afterAll((done) => {
    // Close the server after tests
    service.close(done);
});

describe('Job Scraper Service', () => {
    it('GET /health', async () => {
        const response = await request(service).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
    });
});
