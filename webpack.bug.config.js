module.exports = {
    entry: './src/entry.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };