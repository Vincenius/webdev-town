import fs from 'fs'
import puppeteer from "puppeteer"

const handler = async (req, res) => {
  const url = decodeURI(req.query.url)
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const path = './public/screenshot.jpeg'

  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }

  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(url);
  await page.screenshot({ path });
  await browser.close();

  res.status(200).json({ path })
}

export default handler
