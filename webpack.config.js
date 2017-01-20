var webpack = require('webpack');
const path  = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./app/app.ts']
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: 'http://localhost:8080/',
        filename: 'assets/[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                loader: ExtractTextPlugin.extract(
                    {
                        fallbackLoader: 'style-loader',
                        loader: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                    }
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'assets/style.css'})
    ],
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
};


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = module.exports.plugins.concat(
        [
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
        ]
    );
}