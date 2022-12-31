import puppeteer from "puppeteer";

const browser = async () => {
  const width = 400,
    height = 900;
  const device = puppeteer.devices["iPhone X"];
  const options = {
    // headless: false,
    // devtools: true,
    // slowMo: 250,
    args: [
      `--window-size=${width},${height}`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  };

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.emulate(device);
  await page.setViewport({ width, height });

  return await {
    page,
    browser,
  };
};

export default browser;
