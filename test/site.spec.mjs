import { test, expect } from '@playwright/test';

const routes = ['/', '/adopt/', '/packages/', '/testing/'];

for (const route of routes) {
  test(`${route} renders readable static content without horizontal overflow`, async ({ page }, info) => {
    const failures = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('response', response => {
      if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
    });
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/.+ · OWLS$/);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
    expect(await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }))).toEqual({ page: info.project.use.viewport.width, viewport: info.project.use.viewport.width });
    expect(failures).toEqual([]);
    await page.screenshot({ path: info.outputPath('page.png'), fullPage: true });
  });
}

test('every internal destination and fragment exists in the built site', async ({ page }) => {
  const internal = new Set();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a').evaluateAll(links => links.map(link => link.href))) {
      const url = new URL(href);
      if (url.origin === new URL(page.url()).origin) internal.add(url.href);
      else expect(url.protocol, `external destination ${href}`).toBe('https:');
    }
  }
  expect(internal.size).toBeGreaterThan(routes.length);
  for (const href of internal) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
    await page.goto(href);
    const fragment = decodeURIComponent(new URL(href).hash.slice(1));
    if (fragment) expect(await page.evaluate(id => !!document.getElementById(id), fragment), href).toBe(true);
  }
});

test('keyboard users can skip navigation and follow an integration link', async ({ page }) => {
  await page.goto('/adopt/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', { name: 'Organization app integration' }).click();
  await expect(page).toHaveURL(/\/adopt\/#org-app$/);
  await expect(page.locator('#org-app')).toBeInViewport();
});
