import ServiceError, { HttpStatusClientError } from '@/errors/ServiceError';
import { queryPg } from '../db/clients';
import { CreateJobPostDTO, JobPost } from '../types/JobPost';

export async function getJobPostById(id: string, userId: string): Promise<JobPost | null> {
    const result = await queryPg('SELECT id, url FROM job_post WHERE id = $1 AND user_id = $2', [
        id,
        userId
    ]);

    return result.rows[0] || null;
}

export async function createJobPost(jobPost: CreateJobPostDTO, userId: string): Promise<JobPost> {
    const { url } = jobPost;
    const result = await queryPg(
        'INSERT INTO job_post (url, user_id) VALUES($1, $2) RETURNING id, url',
        [url, userId]
    );

    return result.rows[0];
}

export async function deleteJobPost(id: string, userId: string): Promise<void> {
    const result = await queryPg('DELETE FROM job_post WHERE id = $1 AND user_id = $2', [
        id,
        userId
    ]);

    if (result.rowCount === 0) {
        throw new ServiceError('Job post does not exist.', HttpStatusClientError.BAD_REQUEST);
    }
}
