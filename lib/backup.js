module.exports = function backup (source, dest) {
  var fs = require('fs')
  var Rsync = require('rsync')
  var colors = require('colors/safe')

  var rsync = new Rsync()
    .flags('av')
    .set('delete')
    .set('progress')
    .source(source)
    .destination(dest)
    .exclude(['.Trash*', 'Library*', '.DS_Store', '.docker'])

  console.log(colors.green.underline(`Backing up ${source} to ${dest}\n`))

  new Promise((resolve, reject) => {
    fs.stat(dest, (err, stats) => {
      if (err) {
        if (err.errno === -2) {
          // Using sync method here for readability
          console.log(colors.red('Directory Does not exist, creating...'))
          fs.mkdirSync(dest)
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
