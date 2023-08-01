import fs from 'fs';
import { simpleGit, CleanOptions } from 'simple-git'
import fetch from 'node-fetch'
import { convert, resize } from "easyimage"

const download = async ({ url, path }) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path, buffer)
}

const git = simpleGit() // .clean(CleanOptions.FORCE);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  // todo handle local file
  const fileExt = body.image.split('.').pop();
  const fileName = `${new Date().toISOString()}-${body.title.replace(/[^a-zA-Z0-9]/g, '')}.${fileExt}`
  const path = `../frontend/src/assets/content/0_new/${fileName}` // directly store in frontend directory

  if (body.image.startsWith('http')) {
    await download({ url: body.image, path })
  } else {
    fs.copyFileSync(body.image, path)
    fs.unlinkSync(body.image)
  }

  const destPath = path.replace(fileExt, 'jpg')
  await convert({
    src: path,
    dst: destPath,
  });
  fs.unlinkSync(path)

  await resize({
    src: destPath,
    dst: destPath,
    width: 1200,
    onlyDownscale: true,
  })

  // TODO update database

  // await git.pull();

  // await simpleGit().add(destPath);
  // await simpleGit().commit('testing automatic commits!')
  // await simpleGit().push('origin', 'main');

  res.status(200).json({  })
}

export default handler
