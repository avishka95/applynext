import { extractPageToPdf } from '@/scraper';
import config from '../config';

describe('scraper functionality', () => {
    test('extractPageToPdf() with empty string', async () => {
        expect(extractPageToPdf('')).rejects.toThrow();
    });
    test('extractPageToPdf() with http', async () => {
        expect(extractPageToPdf('http')).rejects.toThrow();
    });

    test('extractPageToPdf() with valid URL', async () => {
        const buffer = await extractPageToPdf(config.validJobUrl);
        expect(buffer instanceof Buffer).toBeTruthy();
    }, 10000);
});
