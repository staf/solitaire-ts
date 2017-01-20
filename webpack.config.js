var webpack = require('webpack');
const path  = require('path');

module.exports = {
    entry: {
        app: ['./app/app.ts']
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
};


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ];
}