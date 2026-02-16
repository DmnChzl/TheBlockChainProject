import { expect, test } from '@playwright/test';

test('should navigate to public route', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await expect(page.getByRole('heading', { name: 'The BlockChain Tool' })).toBeVisible();
  await page.getByRole('button', { name: 'Use Public Chain' }).click();

  await expect(page).toHaveURL(/\/upload$/);
});

test('should open modal and navigate to private route', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await expect(page.getByRole('heading', { name: 'The BlockChain Tool' })).toBeVisible();
  await page.getByRole('button', { name: 'Have My Own' }).click();

  // Check modal title
  await expect(page.getByText('Use Private Chain ?')).toBeVisible();
  await page.getByRole('button', { name: 'Drop My Chain' }).click();

  await expect(page).toHaveURL(/\/upload\?mode=private$/);
});
