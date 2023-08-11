import fs from 'fs'
import captureWebsite from 'capture-website';

const handler = async (req, res) => {
  const url = decodeURI(req.query.url)
  const options = { width: 1200, height: 630, launchOptions: { headless: true } }
  const path = './public/screenshot.jpeg'
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
  await captureWebsite.file(url, path, options);

  res.status(200).json({ path })
}

export default handler
