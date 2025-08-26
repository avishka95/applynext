import ServiceError, { HttpStatusClientError } from '@/errors/ServiceError';
import { queryPg } from '../db/clients';
import { CreateJobPostDTO, JobPost } from '../types/JobPost';

/**
 * Retrieves a job post by its ID and associated user ID.
 *
 * @param id - The unique identifier of the job post.
 * @param userId - The unique identifier of the user who owns the job post.
 * @returns A promise that resolves to the `JobPost` object if found, or `null` if not found.
 */
export async function getJobPostById(id: string, userId: string): Promise<JobPost | null> {
    const result = await queryPg('SELECT id, url FROM job_post WHERE id = $1 AND user_id = $2', [
        id,
        userId
    ]);

    return result.rows[0] || null;
}

/**
 * Creates a new job post entry in the database for the specified user.
 *
 * @param jobPost - The data transfer object containing job post details, including the URL.
 * @param userId - The unique identifier of the user creating the job post.
 * @returns A promise that resolves to the created JobPost object containing the ID and url.
 * @throws Will throw an error if the database insertion fails.
 */
export async function createJobPost(jobPost: CreateJobPostDTO, userId: string): Promise<JobPost> {
    const { url } = jobPost;
    const result = await queryPg(
        'INSERT INTO job_post (url, user_id) VALUES($1, $2) RETURNING id, url',
        [url, userId]
    );

    return result.rows[0];
}

/**
 * Deletes a job post with the specified ID belonging to the given user.
 *
 * @param id - The unique identifier of the job post to delete.
 * @param userId - The unique identifier of the user who owns the job post.
 * @returns A promise that resolves when the job post is successfully deleted.
 * @throws {ServiceError} If the job post does not exist or does not belong to the user.
 */
export async function deleteJobPost(id: string, userId: string): Promise<void> {
    const result = await queryPg('DELETE FROM job_post WHERE id = $1 AND user_id = $2', [
        id,
        userId
    ]);

    if (result.rowCount === 0) {
        throw new ServiceError('Job post does not exist.', HttpStatusClientError.BAD_REQUEST);
    }
}
