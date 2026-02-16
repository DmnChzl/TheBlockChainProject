import { expect, test } from '@playwright/test';
import ENROLLMENT_RESULT from './__mocks__/enrollment-result.json';
import VERIFICATION_RESULT from './__mocks__/verification-result.json';

test('should upload a file and enroll it', async ({ page }) => {
  await page.route('**/api/enroll', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ENROLLMENT_RESULT),
    });
  });

  await page.goto('http://localhost:4200/upload');

  // Upload a file
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles({
    name: 'favicon.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from('Lorem ipsum dolor sit amet'),
  });

  await expect(page.locator('#file-wrapper')).toBeVisible();
  await page.getByRole('button', { name: /enroll/i }).click();

  // Check notification message
  await expect(page.getByText('Block #6 Added To The BlockChain.')).toBeVisible();
});

test('should upload a file and verify it', async ({ page }) => {
  await page.route('**/api/verify', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(VERIFICATION_RESULT),
    });
  });

  await page.goto('http://localhost:4200/upload?mode=private');

  // Upload a file
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles({
    name: 'helloworld.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Lorem ipsum dolor sit amet'),
  });

  await expect(page.locator('#file-wrapper')).toBeVisible();
  await page.getByRole('button', { name: /verify/i }).click();

  // Check notification message
  await expect(page.getByText('Block #1 Found!')).toBeVisible();
});
