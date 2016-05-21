'use strict';

const postcssNesting = require('postcss-nesting'),
    webpack = require('webpack'),
    cssnext = require('postcss-cssnext');

var ENV = process.env.npm_lifecycle_event;
var isDev = process.env.DEV = ['build-dev', 'dev', 'build-watch'].indexOf(ENV) > -1;
var isTest = process.env.TEST = ENV === 'build-test';
var isProd = process.env.PROD = ENV === 'build';

var config = {
    entry: ['./app/Bootstrap.tsx'],
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        noParse: [],
        preLoaders: [
            {
                test: /\.tsx?$/,
                loader: 'tslint-loader'
            }
        ],
        loaders: [
            {
                test: /DevTools|redux-logger/,
                loader: isDev ? 'noop' : 'null',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test:   /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            }
        ]
    },
    postcss: function () {
        return [postcssNesting, cssnext];
    },
    devServer: {
        proxy: {
            '/node_modules*' : {
                secure: false,
                target: 'http://localhost:3000'
            }
        }
    },
    tslint: {
        configuration: {
            rules: {
                quotemark: [true, 'single', 'jsx-double']
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


module.exports = config;
