const { merge } = require('webpack-merge')
const common = require('./webpack.commonjs')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map'
})
