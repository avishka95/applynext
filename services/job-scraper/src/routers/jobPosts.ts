import { HttpStatusClientError } from '@/errors/ServiceError';
import { getJobPostById } from '../handlers/jobPosts';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/:id', async (req: Request<{ id: string }>, res: Response, nxtFn: NextFunction) => {
    const { id } = req.params;
    const userId = req.userContext?.userId;
    if (!userId) {
        console.error('User context is missing');
        return res
            .status(HttpStatusClientError.UNAUTHORIZED)
            .json({ error: 'Unauthorized: User context is missing' });
    }
    const jobPost = await getJobPostById(id, userId);
    return jobPost;
});

export default router;
