import { getHealth } from '../handlers/health';
import { Router } from 'express';

const router = Router();

router.get('/', getHealth);

export default router;
