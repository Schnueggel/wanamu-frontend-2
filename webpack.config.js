module.exports = {
    entry: './app/App.tsx',
    output: {
        filename: 'public/bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.d.ts'],
        alias: {
            rx: __dirname + '/node_modules/rx/dist/rx.lite.js'
        }
    },
    module: {
        npParse: /node_modules/,
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
}