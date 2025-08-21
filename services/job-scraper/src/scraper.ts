import { Browser, chromium, Page } from 'playwright-core';

import fs from 'fs';
import { isContainerized } from './utils/env';

/**
 * Extracts the content of a web page at the specified URL and generates a PDF buffer of the rendered page.
 *
 * @param url - The URL of the web page to extract and convert to PDF. Must be a valid HTTP/HTTPS URL.
 * @returns A Promise that resolves to a Buffer containing the generated PDF data.
 * @throws Will throw an error if the URL is invalid, unreachable, or if PDF generation fails.
 *
 * @remarks
 * - Uses a headless Chromium browser to render the page and generate the PDF.
 * - Handles popups using a popup handler before generating the PDF.
 * - Automatically closes the browser instance after PDF generation or on error.
 */
export async function extractPageToPdf(url: string): Promise<Buffer> {
  // Test if the URL is valid
  if (url.trim().length === 0 || !url.startsWith('http')) {
    throw new Error('Invalid URL provided for PDF extraction');
  }
  // Test if the URL is reachable
  const response: Response | null = await fetch(url);
  if (!response || !response.ok) {
    throw new Error(`Failed to fetch the URL: ${url}`);
  }
  const browser = await chromium.launch({
    executablePath: isContainerized() ? '/usr/bin/chromium-browser' : undefined,
    args: isContainerized() ? ['--no-sandbox', '--disable-dev-shm-usage'] : [],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36',
    });
    const page = await context.newPage();
    // Setup popup handler with defaults (you can override selectors)
    const stopPopupHandler = await setupPopupHandler(page);
    await page.goto(url, {
      waitUntil: 'networkidle',
    });
    stopPopupHandler();

    return page.pdf({ format: 'A4' }).finally(() => {
      browser.close();
    }); // In-memory PDF generation
  } catch (error) {
    console.error('Error extracting page to PDF:', error);
    await browser.close();
    throw error; // Re-throw the error for further handling
  }
}

interface PopupHandlerOptions {
  modalSelector?: string;
  modalCloseSelector?: string;
}

async function setupPopupHandler(
  page: Page,
  options: PopupHandlerOptions = {},
) {
  const {
    modalSelector = '.popup, .modal, [role="dialog"]', // default selectors for modals
    modalCloseSelector = '.close, .close-btn, .popup-close-button', // close button inside modal
  } = options;

  // Handle browser dialogs
  page.on('dialog', async (dialog) => {
    console.log(`Dialog detected: ${dialog.message()}`);
    try {
      await dialog.dismiss(); // or dialog.accept() depending on needs
      console.log('Dialog dismissed');
    } catch (e) {
      console.warn('Failed to handle dialog:', e);
    }
  });

  // Handle new popup windows/tabs
  page.on('popup', async (popupPage) => {
    console.log('Popup window detected:', await popupPage.url());
    try {
      await popupPage.close();
      console.log('Popup window closed');
    } catch (e) {
      console.warn('Failed to close popup window:', e);
    }
  });

  // Periodically check for modal popups in DOM and close them
  async function checkAndCloseModal() {
    const modal = await page.$(modalSelector);
    if (modal) {
      console.log('Modal popup detected');

      // Try to click close button inside modal
      const closeBtn = await modal.$(modalCloseSelector);
      if (closeBtn) {
        try {
          await closeBtn.click();
          console.log('Modal popup closed by clicking close button');
        } catch {
          // fallback: remove modal from DOM
          await page.evaluate((selector) => {
            const el = document.querySelector(selector);
            if (el) el.remove();
          }, modalSelector);
          console.log('Modal popup removed from DOM');
        }
      } else {
        // No close button found, just remove from DOM
        await page.evaluate((selector) => {
          const el = document.querySelector(selector);
          if (el) el.remove();
        }, modalSelector);
        console.log('Modal popup removed from DOM (no close button)');
      }
    }
  }

  // Run modal check every 1 second (adjust as needed)
  const intervalId = setInterval(checkAndCloseModal, 1000);

  // Return a cleanup function to stop checking when done
  return () => clearInterval(intervalId);
}
