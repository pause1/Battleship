const path = require('path');
module.exports = {
    entry: './main.ts',
    output: {
      path: path.resolve(__dirname, './prod'),
      filename: 'ready.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/  
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    watch: true
}