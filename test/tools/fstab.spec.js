import { test, expect } from "@playwright/test";


test.describe('fstab generator page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/tools/fstab-generator');
    });

    test('has title', async ({ page }) => {
        await expect(page.getByRole("heading", { name: "Générateur FSTab" })).toBeVisible();
    })

    test('has first tab', async ({ page }) => {
        await expect(page.getByPlaceholder('/dev/sda1')).toBeVisible();
        await expect(page.getByPlaceholder('/', { exact: "/"})).toBeVisible();
    })
})