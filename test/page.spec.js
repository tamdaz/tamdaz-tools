import { test, expect } from '@playwright/test';

/**
 * @param {Object} obj
 * @param {import('@playwright/test').Locator} obj.page
 */
test('has home page', async ({ page }) => {
    await page.goto(`/`);

    await expect(page.getByRole('heading', { name: "Hello world" })).toBeVisible();
});

/**
 * @param {Object} obj
 * @param {import('@playwright/test').Locator} obj.page
 */
test('has fstab generator page', async ({ page }) => {
    await page.goto(`/generator/fstab`);

    await expect(page.getByRole('heading', { name: "Hello world" })).toBeVisible();
});