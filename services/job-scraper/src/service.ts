import express from 'express';

const service = express();
service.use(express.json());

service.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

service.listen(3000, () => {
    console.log('Job Scraper Service is running on port 3000');
});
