import fs from 'fs'
import fetch from 'node-fetch'

const download = async ({ url, path }) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path, buffer)
}

const handler = async (req, res) => {
  const url = decodeURI(req.query.url)
  const path = './public/screenshot.jpeg'
  const apiUrl = `https://api.screenshotmachine.com?key=${process.env.SCREENSHOT_API_KEY}&url=${url}&dimension=1200x630`

  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }

  await download({ url: apiUrl, path })

  res.status(200).json({ path })
}

export default handler
