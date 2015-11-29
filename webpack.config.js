'use strict';

const autoprefixer = require('autoprefixer'),
    postcssNesting = require('postcss-nesting'),
    cssnext = require('postcss-cssnext');

module.exports = {
    entry: ['./app/App.tsx'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    resolve: {
        root: [
            __dirname + '/app'
        ],
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.d.ts']
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
                loader: 'style-loader!css-loader!postcss-loader'
            }
        ]
    },
    postcss: function () {
        return [postcssNesting, cssnext, autoprefixer];
    }
};