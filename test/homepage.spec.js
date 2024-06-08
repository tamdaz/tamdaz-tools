import { test, expect } from "@playwright/test";

test.describe("home page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("has title", async ({ page }) => {
		await expect(
			page.getByRole("heading", { name: "Hello world" }),
		).toBeVisible();
	});

	test("has links", async ({ page }) => {
		await expect(page.getByRole("link", { name: "Accueil" })).toBeVisible();
		await expect(
			page.getByRole("link", { name: "Générateur FSTab" }),
		).toBeVisible();
	});
});
