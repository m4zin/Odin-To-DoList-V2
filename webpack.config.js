const path = require('path');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Used to display potential errors from any script files.
  devtool: 'inline-source-map'
};