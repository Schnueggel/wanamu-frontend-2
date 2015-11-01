module.exports = {
    entry: './app/components/App.tsx',
    output: {
        filename: 'public/bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
}