import fs from 'fs';
import { simpleGit, CleanOptions } from 'simple-git'

const git = simpleGit().clean(CleanOptions.FORCE);

const handler = async (req, res) => {
  await git.pull();

  fs.writeFileSync('../frontend/testy2.json', `[]`);

  await simpleGit().add('.')
  await simpleGit().commit('testing automatic commits!')
  await simpleGit().push('origin', 'main');

  res.status(200).json({  })
}

export default handler
