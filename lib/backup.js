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

  function execRsync () {
    rsync.execute((err, code, cmd) => {
      if (err) console.log(colors.red(err))
      console.log(colors.green.underline('Backup Completed'))
      console.timeEnd('execution time')
    }, (data) => {
      process.stdout.write(colors.yellow(data))
    })
  }

  new Promise((resolve, reject) => {
    fs.stat(dest, (err, stats) => {
      if (err) {
        if (err.errno === -2) {
          console.log(colors.red('Directory Does not exist, creating...'))
          fs.mkdir(dest, (err, callback) => {
            if (err) reject(`${dest} could not be found nor created`)
            else {
              console.log(colors.yellow('Directory Created'))
              return callback
            }
          })
        } else {
          reject(err)
        }
      } else resolve('ok')
    })
  }).then(msg => { if (msg === 'ok') execRsync() })
    .catch(error => { console.log(colors.red.bold(error)) })
}
