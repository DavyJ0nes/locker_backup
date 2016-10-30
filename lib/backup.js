module.exports = function backup (source, dir) {
  var fs = require('fs')
  var Rsync = require('rsync')
  var colors = require('colors/safe')
  var sourceDir = process.argv[2] || '/Users/davidjones'
  var backupDir = process.argv[3] || '/Volumes/Brokkr-Backup/davidjones'

  var rsync = new Rsync()
    .flags('av')
    .set('delete')
    .set('progress')
    .source(sourceDir)
    .destination(backupDir)
    .exclude(['.Trash*', 'Library*', '.DS_Store', '.docker'])

  console.log(colors.green.underline('Beginning Backup\n'))

  new Promise((resolve, reject) => {
    fs.stat(backupDir, (err, stats) => {
      if (err) {
        if (err.errno === -2) {
          // Using sync method here for cleaner reading
          console.log(colors.red('Directory Does not exist, creating...'))
          fs.mkdirSync(backupDir)
          console.log(colors.yellow('Directory Created'))
        } else reject(err)
      } else resolve()
    })
  }).then(
    rsync.execute((err, code, cmd) => {
      if (err) console.log(colors.red(err))
      console.log(colors.green.underline('All done'))
    }, (data) => {
      process.stdout.write(colors.yellow(data))
    })
  )
    .catch(function (reason) { console.log(colors.red.bold(reason)) })
}
