var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            './tests/**/*.tsx'
        ],
        preprocessors: {
           './tests/**/*.test.tsx': ['webpack']
        },
        reporters: ['dots'],
        webpack: {
            resolve: {
                root: [
                    __dirname + '/app'
                ],
                // Add `.ts` and `.tsx` as a resolvable extension.
                extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.d.ts']
            },
            module: {
                loaders: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: false
        }
    });
};
