import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home sem violações de acessibilidade', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
