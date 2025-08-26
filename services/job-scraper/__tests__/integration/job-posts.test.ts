import { getJobPostById } from '@/handlers/jobPosts';
import config from '../config';

describe('JobPost handlers', () => {
    it('returns sample job post for valid user ID', async () => {
        const userId = config.sampleUserId;
        const jobPostId = config.sampleJobPostId;
        const jobPost = await getJobPostById(jobPostId, userId);

        expect(jobPost).not.toBeNull();
        expect(jobPost?.id).toBe(jobPostId);
        expect(jobPost?.url).toBeDefined();
    });
});
