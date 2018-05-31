const replace = require('replace')
const zipFolder = require('zip-folder')
const moveFile = require('move-file')

replace({
  regex: '=/',
  replacement: '=',
  paths: [ './dist/index.html' ],
  recursive: false,
  silent: true
})

zipFolder('./dist/', './build.zip', err => {
  if (err) {
    console.log('oh no!', err)
  } else {
    console.log('# EXCELLENT, ZIP created.')
    moveFile('./build.zip', './dist/build.zip')
    console.log('#     dist/build.zip stored')
  }
})
