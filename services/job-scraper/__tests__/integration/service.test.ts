import request from 'supertest';
import service from '@/service';
import config from '../config';

afterAll(() => {
    // Close the server after tests
    service.close();
});

describe('Job Scraper Service', () => {
    it('GET /health', async () => {
        const response = await request(service).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('OK');
    });

    it('GET /job-posts/:id', async () => {
        const postId = config.sampleJobPostId;
        const response = await request(service)
            .get(`/job-posts/${postId}`)
            .set({ 'x-user-id': config.sampleUserId });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });
});
