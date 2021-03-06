module.exports = {
    entry: './src/main.js',
    output: {
        filename: './public/build/bundle.js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.js']
    }
};
