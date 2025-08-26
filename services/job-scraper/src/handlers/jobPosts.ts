import { queryPg } from '../db/clients';
import { JobPost } from '../types/JobPost';

export async function getJobPostById(id: string, userId: string): Promise<JobPost | null> {
    const result = await queryPg('SELECT id, url FROM job_post WHERE id = $1 AND user_id = $2', [
        id,
        userId
    ]);

    return result.rows[0] || null;
}
