import { getUserById } from '@/handlers/users';
import { User } from '@/types/User';
import config from '../config';
import { getJobPostById } from '@/handlers/jobPosts';

describe('User handlers', () => {
    it('returns user for valid ID', async () => {
        const userId = config.sampleUserId || '';
        const user: User | null = await getUserById(userId);

        expect(user).not.toBeNull();
        expect(user?.id).toBe(userId);
        expect(user?.email).toBeDefined();
    });
});
