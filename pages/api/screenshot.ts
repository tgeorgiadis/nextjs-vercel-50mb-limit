import {NextApiRequest, NextApiResponse} from 'next'
import chromium from 'chrome-aws-lambda'

const getBrowserInstance = async () => {
  const executablePath = await chromium.executablePath

  // running locally
  if (!executablePath) {
    const puppeteer = require('puppeteer');
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true
    })
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let browser = null

  try {
    browser = await getBrowserInstance() as any

    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630
      }
    })

    await page.goto('https://github.com/vercel/vercel/issues/4739')

    const data = await page.screenshot({
      type: "png"
    })

    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    res.setHeader('Content-Type', 'image/png')
    res.end(data)

  } catch (error) {
    console.error(error)
    return res.status(400).json({
      error: error || 'Could not take screenshot'
    })
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }

}
