import {NextApiRequest, NextApiResponse} from 'next'
import playwright from 'playwright-core';
import chromium from 'chrome-aws-lambda';

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath

  // running locally
  if (!executablePath) {
    const playwright = require('playwright')
    return playwright.chromium.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true
    })
  }

  return playwright.chromium.launch({
    args: chromium.args,
    executablePath: executablePath,
    headless: chromium.headless,
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
try {
  await chromium.font("https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf")
  const browser = await getBrowserInstance()

  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630
    }
  });
  //const url = getAbsoluteURL(req.query["path"] as string || "")
  await page.goto('https://github.com/vercel/vercel/discussions/4903', {
    timeout: 15 * 1000
  })
  const data = await page.screenshot({
    type: "png"
  })
  await browser.close()
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
  res.setHeader('Content-Type', 'image/png')
  res.end(data)
} catch (err) {
  console.error(err)
}
}
