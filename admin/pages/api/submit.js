import fs from 'fs';
import { simpleGit } from 'simple-git'
import fetch from 'node-fetch'
import { convert, resize } from "easyimage"
import { create } from '../../utils/database'

function isImageUrl(url) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
  const lowercasedUrl = url.toLowerCase();

  for (const ext of imageExtensions) {
      if (lowercasedUrl.endsWith(ext)) {
          return true;
      }
  }

  return false;
}

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
    : !isImageUrl(body.image)
      ? '.png' // fallback for urls without image ending (usually from github)
      : body.image.split('.').pop();
  const fileName = `${new Date().toISOString()}-${body.title.replace(/[^a-zA-Z0-9]/g, '')}.${fileExt}`
  const path = `../frontend/public/content/0_new/${fileName}` // directly store in frontend directory

  if (body.image.startsWith('http')) {
    await download({ url: body.image, path })
  } else {
    fs.copyFileSync(body.image, path)
    fs.unlinkSync(body.image)
  }

  const destPath = path.replace(fileExt, 'jpg')
  if (path !== destPath) {
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
    image: destPath.replace('../frontend/public/', '/'),
    created_at: body.created_at,
    sponsored: body.sponsored,
    collections: body.collections,
    tags: body.tags,
  })

  await git.pull()
  await simpleGit().add(destPath)

  res.status(200).json({  })
}

export default handler
