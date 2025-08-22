import { extractPageToPdf } from '@/scraper';
import config from '../config';

describe('Scraper testing', () => {
    test('extractPageToPdf() test with empty string', async () => {
        expect(extractPageToPdf('')).rejects.toThrow();
    });
    test('extractPageToPdf() test with http', async () => {
        expect(extractPageToPdf('http')).rejects.toThrow();
    });

    test('extractPageToPdf() test for valid URL', async () => {
        const buffer = await extractPageToPdf(config.validJobUrl);
        expect(buffer instanceof Buffer).toBeTruthy();
    }, 10000);
});
