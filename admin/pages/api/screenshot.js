const handler = async (req, res) => {
  const url = decodeURI(req.query.url)

  res.status(200).json({ path: `https://api.screenshotmachine.com?key=${process.env.SCREENSHOT_API_KEY}&url=${url}&dimension=1200x630` })
}

export default handler
