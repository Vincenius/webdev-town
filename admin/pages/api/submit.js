import fs from 'fs';
import { simpleGit } from 'simple-git'
import fetch from 'node-fetch'
import { convert, resize } from "easyimage"
import { create } from '../../utils/database'

const download = async ({ url, path }) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path, buffer)
}

const git = simpleGit() // .clean(CleanOptions.FORCE);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);

  const fileExt =  body.image.includes('https://api.screenshotmachine.com')
    ? '.jpg'
    : body.image.split('.').pop();
  console.log('YO', fileExt)
  const fileName = `${new Date().toISOString()}-${body.title.replace(/[^a-zA-Z0-9]/g, '')}.${fileExt}`
  const path = `../frontend/src/assets/content/0_new/${fileName}` // directly store in frontend directory

  if (body.image.startsWith('http')) {
    await download({ url: body.image, path })
  } else {
    fs.copyFileSync(body.image, path)
    fs.unlinkSync(body.image)
  }

  const destPath = path.replace(fileExt, 'jpg')
  if (path !== destPath) {
    console.log(path, destPath)
    await convert({
      src: path,
      dst: destPath,
    });
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
  }

  await resize({
    src: destPath,
    dst: destPath,
    width: 1200,
    onlyDownscale: true,
  })

  await create({
    title: body.title,
    description: body.description,
    link: body.url,
    image: destPath.replace('../frontend/src/assets', '../assets'),
    created_at: body.created_at,
  })

  await git.pull()
  await simpleGit().add(destPath)

  res.status(200).json({  })
}

export default handler
