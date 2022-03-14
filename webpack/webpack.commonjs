const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootDir = path.join(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

module.exports = {
  entry: {
    background: path.join(srcDir, 'background.ts')
  },
  output: {
    path: path.join(rootDir, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(rootDir, 'manifest.json'),
          to: '.'
        }
      ]
    })
  ]
}
