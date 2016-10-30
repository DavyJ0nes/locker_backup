#!/usr/bin/env node
var fs = require('fs')
var backup = require('./lib/backup.js')

if (process.argv[2] === undefined) {
  if (fs.statSync('./config.json').isFile()) {
    var config = require('./config.json')
  }
}

var src = process.argv[2] || config.src
var dest = process.argv[3] || config.dest

backup(src, dest)
