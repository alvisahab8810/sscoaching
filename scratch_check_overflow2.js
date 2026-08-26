const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const widths = [1024, 768, 414, 375];
  for (const width of widths) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width, height: 900 });
      await page.goto('http://localhost:3001/nios-datesheet', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1500));
      const result = await page.evaluate(() => ({
        docWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      console.log(`width=${width}`, JSON.stringify(result));
      await page.close();
    } catch (e) {
      console.log(`width=${width} ERROR`, e.message);
    }
  }
  await browser.close();
})();
