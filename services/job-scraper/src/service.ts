import express from 'express';
import healthRouter from './routers/health';
import jobPostsRouter from './routers/jobPosts';
import { userContext } from './middleware/userContext';
import logger from './utils/logger';
import config from './config';

const PORT = config.servicePort ?? 3000;
const service = express();
service.use(express.json());
service.use(userContext);

service.use('/health', healthRouter);
service.use('/job-posts', jobPostsRouter);

export const server = service.listen(PORT, () => {
    logger.debug(`Job Scraper Service is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('👋 SIGINT received. Closing server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Closing server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

export default server;
