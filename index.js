#! /usr/bin/env node

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./data",
  });
  const page = await browser.newPage();

  await page.goto(
    'https://www.secretparty.io/organize/Xmo68yj51v/tickets',
    {waitUntil: "networkidle2"},
    );

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Get page data
  const rows = await page.$$eval('tbody > tr', elements => {
    return elements.map(el => {el.innerText});
  });

  await browser.close();
})();
