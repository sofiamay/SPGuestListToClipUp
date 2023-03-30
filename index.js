#! /usr/bin/env node

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./data",
  });
  const page = await browser.newPage();

  await page.goto(
    'https://www.secretparty.io/organize/Xmo68yj51v/tickets',
    {waitUntil: "networkidle2"},
    );

  await page.waitForSelector('tr');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Get page data
  // const rows = await page.$$eval('tbody > tr', elements => {
  //   return elements.map(el => {el.innerText});
  // });

  const header = await page.$$eval('th', cols => {
    return Array.from(cols, col => {
      return col.innerText;
    });
  });

  console.log(header);


  const result = await page.$$eval('tbody tr', rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });

  // console.log(result[4]);

  await browser.close();
})();
