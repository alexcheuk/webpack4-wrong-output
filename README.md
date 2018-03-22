# webpack4-wrong-output

This is a repo to showcase this issue:

https://github.com/webpack/webpack/issues/6604


***Expected behaviour:***

```js
module.exports = {
    entry: './src/entry.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    }
};
```

```
npm run build

Hash: 179ef676f3f209766f0e
Version: webpack 4.2.0
Time: 1051ms
Built at: 3/22/2018 3:55:56 PM
                            Asset       Size  Chunks             Chunk Names
non-entry.f26d78439489f8f9e993.js  183 bytes       0  [emitted]  non-entry
                          main.js   1.88 KiB       1  [emitted]  main
```


***Bug Behaviour when seperating runtime chunk***

```
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
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader"
          }
        }]
    }
};
```

```
npm run build-bug

Hash: 13eb15863b37228d1652
Version: webpack 4.2.0
Time: 1048ms
Built at: 3/22/2018 3:56:20 PM
                            Asset       Size  Chunks             Chunk Names
non-entry.f26d78439489f8f9e993.js  183 bytes       0  [emitted]  non-entry
                      manifest.js   1.79 KiB       1  [emitted]  manifest
     main.6d0c4f8f202fe8a191b6.js  347 bytes       2  [emitted]  main
```

Notice that `main.js` now uses `output.chunkFilename` template ([name].[chunkhash].js) and according to the docs (https://webpack.js.org/configuration/output/#output-chunkfilename), `output.chunkFilename` is not suppose to be apply to `main.js`.
