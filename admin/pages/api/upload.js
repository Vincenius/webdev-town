import fs from 'fs';
import { simpleGit } from 'simple-git'

const handler = async (req, res) => {
  fs.writeFileSync('../frontend/testy2.json', `[]`);

  await simpleGit()
    .add('.')
    .commit('testing automatic commits!')
    .push('origin', 'main');

  res.status(200).json({  })
}

export default handler
