import { expect, test } from '@playwright/test';
import BLOCK_CHAIN_STATE from './__mocks__/blockchain-state.json';

test('should display list items, open modal and filter list items', async ({ browserName, page }) => {
  if (browserName === 'chromium') {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  }

  await page.route('**/api/blockchain', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(BLOCK_CHAIN_STATE),
    });
  });

  await page.goto('http://localhost:4200/blockchain');

  // Verify all list items (based on mock)
  await expect(page.getByRole('listitem')).toHaveCount(5);

  // Check modal title
  await page.getByText('5cf35f3f6ff897f2').click();
  await expect(page.getByText('Block #2')).toBeVisible();

  // Check notification message
  await page.getByRole('button', { name: 'Copy Prev Hash' }).click();
  await expect(page.getByText('Copied!')).toBeVisible();

  // Wait for close modal
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Close Modal' }).click();

  await page
    .getByRole('textbox', { name: 'Copy/Paste Hash' })
    .fill('5d8f28bdc67717fbd1586d67c949b4d4af318e9ee15e8b5a751b491d584a4887');
  await expect(page.getByRole('listitem')).toHaveCount(2);

  // Verify filtered list items
  await expect(page.getByText('5d8f28bdc67717fb')).toBeVisible();
  await expect(page.getByText('5cf35f3f6ff897f2')).toBeVisible();
});
