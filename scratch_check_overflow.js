const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const widths = [1920, 1536, 1440, 1366, 1280, 1024, 768];
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.goto('http://localhost:3001/nios-datesheet', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));

    const result = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const viewportWidth = document.documentElement.clientWidth;
      const offenders = [];
      document.querySelectorAll('*').forEach(el => {
        const cls = el.className && el.className.toString ? el.className.toString() : '';
        if (cls.includes('offcanvas') || cls.includes('branch-canvas') || cls.includes('branch-contact') || cls.includes('branch-card') || cls.includes('location-text') || cls.includes('contact-icon') || cls.includes('c-icons') || cls.includes('whatsapp')) return;
        const rect = el.getBoundingClientRect();
        if (rect.right > viewportWidth + 2) {
          offenders.push({
            tag: el.tagName,
            cls: cls.slice(0, 80),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            text: el.textContent ? el.textContent.trim().slice(0, 60) : ''
          });
        }
      });
      return { docWidth, viewportWidth, offenders: offenders.slice(0, 15) };
    });

    console.log(`--- width=${width} ---`);
    console.log(JSON.stringify(result, null, 2));
    await page.close();
  }
  await browser.close();
})();
