var path = require('path')
var rootPath = path.join(__dirname, '..')
var env = process.env.NODE_ENV || 'development'

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'opengraph-spy'
    },
    port: process.env.PORT || 3000
  },

  test: {
    root: rootPath,
    app: {
      name: 'opengraph-spy'
    },
    port: process.env.PORT || 3000
  },

  production: {
    root: rootPath,
    app: {
      name: 'opengraph-spy'
    },
    port: process.env.PORT
  }
}

module.exports = config[env]
