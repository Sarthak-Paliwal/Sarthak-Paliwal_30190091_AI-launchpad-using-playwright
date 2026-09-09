import type { Page, TestInfo } from '@playwright/test';

export class ScreenshotUtil {
  static async capture(page: Page, testInfo: TestInfo, name: string): Promise<void> {
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  }
}
