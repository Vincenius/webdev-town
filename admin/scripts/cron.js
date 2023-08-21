const fs = require('fs');
const { Cron } = require("croner");
const { simpleGit } = require('simple-git')

const git = simpleGit()

const run = async () => {
  console.log('Run cron job')

  const dateString = new Date().toISOString()
  const path = `${__dirname}/log.txt`
  fs.writeFileSync(path, `${dateString}`)

  await git.pull()
  await simpleGit().add(path)
  await simpleGit().commit(`cron deploy ${new Date().toISOString()}!`)
  await simpleGit().push('origin', 'main')

  console.log('Cron job done')
}

const job = Cron("0 0 * * * *", { utcOffset: 0 }, async () => {
  await run()
} );
