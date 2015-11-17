'use strict';

let webpack = require("webpack"),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext');

module.exports = {
    entry: ['webpack/hot/dev-server', './app/App.tsx'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.d.ts'],
        alias: {
            rx: __dirname + '/node_modules/rx/dist/rx.lite.js'
        }
    },
    plugins: [],
    module: {
        npParse: /node_modules/,
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [cssnext, autoprefixer];
    }
};