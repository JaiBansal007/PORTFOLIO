const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1280, height: 900 });

  // Navigate to localhost where Next.js is running
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Wait a little extra time for animations to settle
  await new Promise(r => setTimeout(r, 1000));

  // Take full page screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved to screenshot.png');
})();
