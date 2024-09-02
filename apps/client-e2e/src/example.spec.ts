import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/list');

  // 检查页面内容是否正确渲染
  const footer = page.locator('footer');
  await expect(footer).toHaveText('Footer');
});
