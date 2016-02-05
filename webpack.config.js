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
        noParse: [
            /[/\\]react[/\\]/,
            /node_modules[/\\]redux/,
            /[/\\]rx[/\\]/,
            /[/\\]webpack[/\\]/,
            /[/\\]webpack-dev-server[/\\]/,
            /[/\\]react-router[/\\]/,
            /[/\\]react-redux[/\\]/
        ],
        preLoaders: [
            {
                test: /\.tsx?$/,
                loader: "tslint-loader"
            }
        ],
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
    },
    tslint: {
        configuration: {
            rules: {
                quotemark: [true, "single"]
            }
        },

        // tslint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: true,

        // tslint does not interrupt the compilation by default
        // if you want any file with tslint errors to fail
        // set failOnHint to true
        failOnHint: true
    }
};
