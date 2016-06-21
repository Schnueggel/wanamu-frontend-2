var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            './tests/**/*.tsx'
        ],
        preprocessors: {
           './tests/**/*.test.tsx': ['webpack']
        },
        reporters: ['dots'],
        client: {
            captureConsole: true,
            mocha: {
                bail: true
            }
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: false
        }
    });
};
